using FluentValidation;

namespace ChatApi.DTO.Validations;

public class UserDtoValidator : AbstractValidator<UserDto>
{
	public UserDtoValidator()
	{
		RuleFor(x => x.Login)
			.NotEmpty().WithMessage("Логин не может быть пустым")
			.MinimumLength(3).WithMessage("Логин должен содержать не менее 3 символов")
			.MaximumLength(50).WithMessage("Логин не должен превышать 50 символов");
	}
}