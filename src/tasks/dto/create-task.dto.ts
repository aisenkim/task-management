import { IsNotEmpty } from 'class-validator';

// refer to the method in controller
export class CreateTaskDto {
  @IsNotEmpty() // pipes from 'class-validator'
  title: string;
  @IsNotEmpty()
  description: string;
}
