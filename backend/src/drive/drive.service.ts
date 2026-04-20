import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { google } from 'googleapis';
import { Readable } from 'stream';

@Injectable()
export class DriveService {
  private readonly logger = new Logger(DriveService.name);

  constructor(private readonly config: ConfigService) { }

  private getDriveClient() {
    const clientId = this.config.get<string>('google.clientId');
    const clientSecret = this.config.get<string>('google.clientSecret');
    const refreshToken = this.config.get<string>('google.refreshToken');

    if (!clientId || !clientSecret || !refreshToken) {
      throw new InternalServerErrorException(
        'Missing OAuth2 credentials for Google Drive. Please set GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, and GOOGLE_REFRESH_TOKEN in your .env.',
      );
    }

    const oauth2Client = new google.auth.OAuth2(
      clientId,
      clientSecret,
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: refreshToken,
    });

    return google.drive({ version: 'v3', auth: oauth2Client });
  }

  /**
   * Uploads a payment slip to Google Drive and returns a public view URL.
   */
  async uploadSlip(file: Express.Multer.File, orderId: string): Promise<string> {
    const drive = this.getDriveClient();
    const folderId = this.config.get<string>('google.driveFolderId');

    const ext = file.originalname.split('.').pop() ?? 'jpg';
    const filename = `slip_${orderId}.${ext}`;

    try {
      // Upload file directly into the folder. 
      // supportsAllDrives: true is added to support Google Workspace Shared Drives
      const uploaded = await drive.files.create({
        requestBody: {
          name: filename,
          parents: folderId ? [folderId] : undefined,
        },
        supportsAllDrives: true,
        media: {
          mimeType: file.mimetype,
          body: Readable.from(file.buffer),
        },
        fields: 'id',
      });

      const fileId = uploaded.data.id;

      // Make it publicly readable using standard permissions
      await drive.permissions.create({
        fileId,
        supportsAllDrives: true,
        requestBody: {
          role: 'reader',
          type: 'anyone',
        },
      });

      return `https://drive.google.com/file/d/${fileId}/view`;
    } catch (err: any) {
      this.logger.error('Drive upload failed:', err);
      // Log deeper Google API errors
      if (err?.response?.data?.error?.message) {
        this.logger.error('Google API Error:', err.response.data.error.message);
      }
      throw new InternalServerErrorException('Failed to upload payment slip to Google Drive.');
    }
  }
}
