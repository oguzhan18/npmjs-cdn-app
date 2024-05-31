import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';

/**
 * Service to fetch files from npm, yarn, and pnpm package managers.
 */
@Injectable()
export class CdnService {
  /**
   * Fetches a file from the npm package manager.
   * @param packageName The name of the package.
   * @param filePath The path to the file within the package.
   * @returns The content of the file.
   * @throws NotFoundException if the file cannot be fetched.
   */
  private async fetchFromNpm(packageName: string, filePath: string): Promise<string> {
    try {
      const url = `https://unpkg.com/${packageName}/${filePath}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new NotFoundException(
        `Could not fetch file: ${filePath} from package: ${packageName} on npm`,
      );
    }
  }

  /**
   * Fetches a file from the yarn package manager.
   * @param packageName The name of the package.
   * @param filePath The path to the file within the package.
   * @returns The content of the file.
   * @throws NotFoundException if the file cannot be fetched.
   */
  private async fetchFromYarn(packageName: string, filePath: string): Promise<string> {
    try {
      const url = `https://cdn.jsdelivr.net/npm/${packageName}/${filePath}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new NotFoundException(
        `Could not fetch file: ${filePath} from package: ${packageName} on yarn`,
      );
    }
  }

  /**
   * Fetches a file from the pnpm package manager.
   * @param packageName The name of the package.
   * @param filePath The path to the file within the package.
   * @returns The content of the file.
   * @throws NotFoundException if the file cannot be fetched.
   */
  private async fetchFromPnpm(packageName: string, filePath: string): Promise<string> {
    try {
      const url = `https://cdn.jsdelivr.net/npm/${packageName}/${filePath}`;
      const response = await axios.get(url);
      return response.data;
    } catch (error) {
      throw new NotFoundException(
        `Could not fetch file: ${filePath} from package: ${packageName} on pnpm`,
      );
    }
  }

  /**
   * Determines the source and fetches the file from the corresponding package manager.
   * @param source The package manager to fetch the file from (npm, yarn, pnpm).
   * @param packageName The name of the package.
   * @param filePath The path to the file within the package.
   * @returns The content of the file.
   * @throws NotFoundException if the source is invalid or the file cannot be fetched.
   */
  async getFile(source: string, packageName: string, filePath: string): Promise<string> {
    if (source === 'npm') {
      return this.fetchFromNpm(packageName, filePath);
    } else if (source === 'yarn') {
      return this.fetchFromYarn(packageName, filePath);
    } else if (source === 'pnpm') {
      return this.fetchFromPnpm(packageName, filePath);
    } else {
      throw new NotFoundException(`Invalid source: ${source}`);
    }
  }
}
