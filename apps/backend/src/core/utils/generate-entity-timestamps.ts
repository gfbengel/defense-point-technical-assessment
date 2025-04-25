import { Optional } from "../types/optional";


export interface EntityTimestampsProps {
  createdAt?: Date
  updatedAt?: Date
}

export function generateEntityTimestamps<EntityProps extends EntityTimestampsProps>(props: Optional<EntityProps, 'createdAt' | 'updatedAt'>) {
  return {
    ...props,
    createdAt: props.createdAt ?? new Date(),
    updatedAt: props.updatedAt ?? new Date(),
  }
}
