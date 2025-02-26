namespace ChatApi.DTO;

public record CreateMessageRequest(string Text, Guid UserId);