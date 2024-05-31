import { Controller, Get, Param, Res } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { CdnService } from './cdn.service';
import { Response } from 'express';

/**
 * CDN Controller that handles requests to serve files from various package managers.
 */
@ApiTags('CDN')
@Controller('cdn')
export class CdnController {
  constructor(private readonly cdnService: CdnService) {}

  /**
   * Serves a file from the specified package manager, package, and file path.
   * @param source The package manager to fetch the file from (npm, yarn, pnpm).
   * @param packageName The name of the package.
   * @param filePath The path to the file within the package.
   * @param res The response object.
   */
  @ApiOperation({ summary: 'Serve a file from a package manager' })
  @ApiParam({
    name: 'source',
    description: 'The package manager to fetch the file from (npm, yarn, pnpm)',
    type: String,
  })
  @ApiParam({
    name: 'packageName',
    description: 'The name of the package',
    type: String,
  })
  @ApiParam({
    name: 'filePath',
    description: 'The path to the file within the package',
    type: String,
  })
  @Get(':source/:packageName/:filePath(*)')
  async serveFile(
    @Param('source') source: string,
    @Param('packageName') packageName: string,
    @Param('filePath') filePath: string,
    @Res() res: Response,
  ) {
    try {
      const fileContent = await this.cdnService.getFile(
        source,
        packageName,
        filePath,
      );
      res.setHeader('Content-Type', 'application/javascript');
      res.send(fileContent);
    } catch (error) {
      res.status(404).send(error.message);
    }
  }
}
