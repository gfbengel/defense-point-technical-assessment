import { Patch, Param, Controller } from "@nestjs/common";
import { ParseULIDPipe } from "../../pipes/parse-ulid.pipe";
import { ToggleFavoriteStatusUseCase } from "@/domain/use-cases/recipes/toggle-favorite-status";

@Controller(':id/toggle-favorite-status')
export class ToggleFavoriteStatusController {
  constructor(private readonly toggleFavoriteStatusUseCase: ToggleFavoriteStatusUseCase) { }

  @Patch()
  async handle(@Param('id', new ParseULIDPipe()) id: string) {
    await this.toggleFavoriteStatusUseCase.execute({ id })

    return {
      message: 'Recipe favorite status toggled'
    }
  }
}
