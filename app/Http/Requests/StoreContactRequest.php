<?php

namespace App\Http\Requests;

use App\Concerns\ContactValidationRules;
use App\Models\Contact;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class StoreContactRequest extends FormRequest
{
    use ContactValidationRules;

    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()->can('create', Contact::class);
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return $this->contactRules();
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        if ($this->has('tags') && is_string($this->input('tags'))) {
            $tags = array_values(array_filter(array_map(
                trim(...),
                explode(',', $this->string('tags')->toString()),
            )));

            $this->merge([
                'tags' => $tags === [] ? null : $tags,
            ]);
        }
    }
}
