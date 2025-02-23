namespace Domain.Entities;

public class User : BaseEntity
{
	public string Login { get; set; }
	public List<Message> Messages { get; set; } = [];
}