package edu.ucsb.cs156.happiercows.errors;

public class EntityNotFoundException extends RuntimeException {
  public EntityNotFoundException(Class<?> entityType, Object id) {
    super("%s with id %s not found"
        .formatted(entityType.getSimpleName(), id.toString()));
  }

  public EntityNotFoundException(Class<?> entityType, String id1Label, Object id1, String id2Label, Object id2) {
    super("%s with %s %s and %s %s not found"
        .formatted(entityType.getSimpleName(),
            id1Label,
            id1.toString(),
            id2Label,
            id2.toString()));
  }
}