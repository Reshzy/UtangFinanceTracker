<?php

namespace App\Concerns;

use Illuminate\Contracts\Validation\ValidationRule;

trait ContactValidationRules
{
    /**
     * Get the validation rules used to validate contacts.
     *
     * @return array<string, array<int, ValidationRule|array<mixed>|string>>
     */
    protected function contactRules(): array
    {
        return [
            'full_name' => ['required', 'string', 'max:255'],
            'nickname' => ['nullable', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:50'],
            'address' => ['required', 'string', 'max:1000'],
            'relationship' => ['required', 'string', 'max:255'],
            'facebook' => ['required', 'string', 'max:255'],
            'birthday' => ['nullable', 'date'],
            'notes' => ['nullable', 'string', 'max:5000'],
            'tags' => ['nullable', 'array'],
            'tags.*' => ['string', 'max:50'],
        ];
    }
}
