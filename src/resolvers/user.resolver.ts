import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from 'src/db/models/user.entity';
import RepoService from 'src/repo.service';
import UserInput from './input/user.input';

@Resolver(() => User)
class UserResolver {
  constructor(private readonly repoService: RepoService) {}

  @Query(() => [User])
  public async getUsers(): Promise<User[]> {
    return this.repoService.userRepo.find();
  }

  @Query(() => User, { nullable: true })
  public async getUserById(@Args('id') id: number): Promise<User> {
    return this.repoService.userRepo.findOne(id);
  }

  @Query(() => User, { nullable: true })
  public async getUserByEmail(@Args('email') email: string): Promise<User> {
    return this.repoService.userRepo.findOne({ where: { email } });
  }

  @Mutation(() => User)
  public async createUser(@Args('data') input: UserInput): Promise<User> {
    const user = this.repoService.userRepo.create({ email: input.email });
    return this.repoService.userRepo.save(user);
  }
}

export default UserResolver;
