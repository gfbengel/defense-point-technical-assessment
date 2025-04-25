import { PaginationParams, PaginationResponse } from "@/core/repositories/pagination-params";
import { Ingredient } from "../entities/ingredient";


type FindManyIngredientsFilters = {
  name?: string
}

export type FindManyIngredientsOptions = PaginationParams<FindManyIngredientsFilters>

export type FindManyIngredientsResponse = PaginationResponse<Ingredient>

export abstract class IngredientsRepository {
  abstract findById(id: string): Promise<Ingredient | null>
  abstract findByName(name: string): Promise<Ingredient | null>
  abstract findMany(options: FindManyIngredientsOptions): Promise<FindManyIngredientsResponse>
  abstract findAll(): Promise<Ingredient[]>

}

