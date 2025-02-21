namespace Domain.Entities;

public class Chat : BaseEntity
{
	public string Name { get; set; }
	public List<User> Users { get; set; }
}