using Bogus;
using Domain.Entities;

namespace Infrastructure;

public static class Seeding
{
	public static async Task SeedAsync(AppDbContext context)
	{
		if (context.Users.Any())
		{
			return;
		}

		var messagesFaker = new Faker<Message>()
			.RuleFor(m => m.Id, f => f.Random.Guid())
			.RuleFor(m => m.Text, f => f.Lorem.Sentence())
			.RuleFor(m => m.CreatedAt, f => f.Date.Past().ToUniversalTime())
			.RuleFor(m => m.Attachment, f => null);

		var usersFaker = new Faker<User>()
			.RuleFor(u => u.Id, f => f.Random.Guid())
			.RuleFor(u => u.Login, f => f.Name.FullName())
			.RuleFor(u => u.Messages, f => messagesFaker.Generate(10));
		var users = usersFaker.Generate(10);

		var chatsFaker = new Faker<Chat>()
			.RuleFor(c => c.Id, f => f.Random.Guid())
			.RuleFor(c => c.Name, f => f.Lorem.Word())
			.RuleFor(c => c.Users, f => users);

		var chats = chatsFaker.Generate(1);

		await context.Users.AddRangeAsync(users);
		await context.Chats.AddRangeAsync(chats);
		await context.SaveChangesAsync();
	}
}