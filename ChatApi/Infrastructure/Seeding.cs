using Bogus;
using Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure;

public static class Seeding
{
	public static async Task SeedAsync(AppDbContext context)
	{
		if (await context.Users.AnyAsync())
		{
			return;
		}

		var usersFaker = new Faker<User>()
			.RuleFor(u => u.Id, f => f.Random.Guid())
			.RuleFor(u => u.Login, f => f.Name.FullName());

		var users = usersFaker.Generate(10);

		await context.Users.AddRangeAsync(users);
		await context.SaveChangesAsync();

		var messagesFaker = new Faker<Message>()
			.RuleFor(m => m.Id, f => f.Random.Guid())
			.RuleFor(m => m.Text, f => f.Lorem.Sentence())
			.RuleFor(m => m.CreatedAt, f => f.Date.Past().ToUniversalTime())
			.RuleFor(m => m.Creator, f => f.PickRandom(users).Id); 

		var messages = messagesFaker.Generate(2000);

		await context.Messages.AddRangeAsync(messages);

		var chatsFaker = new Faker<Chat>()
			.RuleFor(c => c.Id, f => f.Random.Guid())
			.RuleFor(c => c.Name, f => f.Lorem.Word())
			.RuleFor(c => c.Users, f => f.PickRandom(users, 5).ToList());

		var chats = chatsFaker.Generate(3);

		await context.Chats.AddRangeAsync(chats);
		await context.SaveChangesAsync();
	}
}