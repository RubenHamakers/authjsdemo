using Microsoft.AspNetCore.Identity;

namespace backend.Models;

public class ApplicationUser : IdentityUser
{
    // No need for custom Role property as we'll use Identity's built-in roles
} 