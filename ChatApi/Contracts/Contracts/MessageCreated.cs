namespace Contracts.Contracts;

public record  MessageCreated(string Text, Guid UserId, DateTime CreatedAt);