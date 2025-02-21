namespace Domain.Entities;

public class Reaction : BaseEntity
{
	public Message Message { get; set; }
	public User User { get; set; }
}