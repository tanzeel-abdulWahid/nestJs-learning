import { PartialType } from "@nestjs/mapped-types";
import { CreateUserDto } from "./create-user.dto";

// takes all validations of createUserDto and make fields optional
export class PatchUserDto extends PartialType(CreateUserDto) {

}
