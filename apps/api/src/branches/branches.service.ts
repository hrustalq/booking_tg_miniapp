import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../shared/prisma/prisma.service';
import { ApiClientService } from '../shared/api-client/api-client.service';
import { CreateBranchDto } from './dto/create-branch.dto';
import { UpdateBranchDto } from './dto/update-branch.dto';

@Injectable()
export class BranchesService implements OnModuleInit {
  public apiClients: Map<string, ApiClientService> = new Map();

  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.initializeApiClients();
  }

  private async initializeApiClients() {
    const branches = await this.prisma.branch.findMany();
    if (!branches.length) return;
    for (const branch of branches) {
      const apiClient = new ApiClientService();
      apiClient.initialize(branch.apiUrl);
      this.setBasicAuth(apiClient, branch.authLogin, branch.authPassword);
      this.apiClients.set(branch.id, apiClient);
    }
  }

  private setBasicAuth(
    apiClient: ApiClientService,
    username: string,
    password: string,
  ) {
    const credentials = Buffer.from(`${username}:${password}`).toString(
      'base64',
    );
    const instance = apiClient.getAxiosInstance();
    instance.defaults.headers.common['Authorization'] = `Basic ${credentials}`;
    instance.defaults.headers.common['Accept'] = 'application/json';
    instance.defaults.headers.common['Content-Type'] = 'application/json';
  }

  getApiClient(branchId: string): ApiClientService | undefined {
    return this.apiClients.get(branchId);
  }

  create(createBranchDto: CreateBranchDto) {
    return this.prisma.branch.create({
      data: createBranchDto,
    });
  }

  async findAll(page: number, limit: number) {
    const skip = (page - 1) * limit;
    const [items, total] = await Promise.all([
      this.prisma.branch.findMany({
        skip,
        take: limit,
      }),
      this.prisma.branch.count(),
    ]);
    return {
      items,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  findOne(id: string) {
    return this.prisma.branch.findUnique({
      where: { id },
    });
  }

  update(id: string, updateBranchDto: UpdateBranchDto) {
    return this.prisma.branch.update({
      where: { id },
      data: updateBranchDto,
    });
  }

  remove(id: string) {
    return this.prisma.branch.delete({
      where: { id },
    });
  }
}
