import { Field, InputType } from '@nestjs/graphql';

@InputType()
class MessageUserConnectInput {
  @Field()
  readonly id: number;
}

@InputType()
class MessageUserInput {
  @Field({ nullable: true })
  readonly connect: MessageUserConnectInput;
}

@InputType()
class MessageInput {
  @Field()
  readonly content: string;

  @Field()
  readonly user: MessageUserInput;
}

@InputType()
class DeleteMessageInput {
  @Field()
  readonly messageId: number;

  @Field()
  readonly user: MessageUserInput;
}

export { MessageInput, DeleteMessageInput };
