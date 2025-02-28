namespace RealTimeService.Dto;

public record Message(Guid Id,string Text, DateTime CreatedAt, Guid UserId);