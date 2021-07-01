import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { Message } from 'src/db/models/message.entity';
import { User } from 'src/db/models/user.entity';
import { ValidationError } from 'src/exceptions/validationerror.exception';
import RepoService from 'src/repo.service';
import { Repository } from 'typeorm';
import { DeleteMessageInput, MessageInput } from './input/message.input';

@Resolver(() => Message)
class MessageResolver {
  private messageRepo: Repository<Message>;
  constructor(private readonly repoService: RepoService) {
    this.messageRepo = repoService.messageRepo;
  }

  @Query(() => [Message])
  public async getMessages(): Promise<Message[]> {
    return this.messageRepo.find();
  }

  @Query(() => [Message])
  public async getMessagesByUser(
    @Args('userId') userId: number,
  ): Promise<Message[]> {
    return this.messageRepo.find({
      where: { userId },
    });
  }

  @Query(() => Message, { nullable: true })
  public async getMessage(@Args('id') id: number): Promise<Message> {
    return this.messageRepo.findOne(id);
  }

  @Mutation(() => Message)
  public async createMessage(
    @Args('data') input: MessageInput,
  ): Promise<Message> {
    const message = this.messageRepo.create({
      content: input.content,
      userId: input.user.connect.id,
    });
    return this.messageRepo.save(message);
  }

  @Mutation(() => Message, { nullable: true })
  public async deleteMessage(
    @Args('data') input: DeleteMessageInput,
  ): Promise<Message> {
    const message = await this.messageRepo.findOne(input.messageId);
    if (!message) {
      throw new ValidationError("message doesn't exists!");
    }
    if (message.userId !== input.user.connect.id) {
      throw new ValidationError('An user can only delete his own messages!');
    }
    await this.messageRepo.remove(message);
    return null;
  }

  @ResolveField('user', () => User)
  public async getUser(@Parent() parent: Message): Promise<User> {
    return this.repoService.userRepo.findOne(parent.userId);
  }
}

export default MessageResolver;
