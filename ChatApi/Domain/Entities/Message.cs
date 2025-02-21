namespace Domain.Entities;

public class Message : BaseEntity
{
	public string? Text { get; set; }
	public Attachment? Attachment { get; set; }
	public DateTime CreatedAt { get; set; }
}