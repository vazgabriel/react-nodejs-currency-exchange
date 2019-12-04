import { MigrationInterface, QueryRunner, getRepository } from 'typeorm';
import { User } from '../entity/User';

export class SeedAdminUser1575494372340 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    let user: User = new User();
    user.name = 'Admin';
    user.email = 'admin@admin.com';
    user.password = '654321';
    user.lang = 'en-US';

    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(queryRunner: QueryRunner): Promise<any> {
    await getRepository(User).delete({ isActive: true });
  }
}
