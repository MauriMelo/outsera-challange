import { IsString, IsOptional } from 'class-validator';

export class FindMovieDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  year?: string;

  @IsString()
  @IsOptional()
  studios?: string;

  @IsString()
  @IsOptional() 
  producer?: string;

  @IsString()
  @IsOptional()
  winner?: string;
}