namespace Domain.Entities;

public class User : BaseEntity
{
	public string Login { get; set; } = $"anonimus{Guid.NewGuid().ToString()[..5]}";
	public List<Message> Messages { get; set; }
}