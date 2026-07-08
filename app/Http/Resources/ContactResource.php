<?php

namespace App\Http\Resources;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Contact
 */
class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'fullName' => $this->full_name,
            'nickname' => $this->nickname,
            'phone' => $this->phone,
            'address' => $this->address,
            'relationship' => $this->relationship,
            'facebook' => $this->facebook,
            'birthday' => $this->birthday?->toDateString(),
            'notes' => $this->notes,
            'tags' => $this->tags ?? [],
            'isArchived' => $this->archived_at !== null,
            'archivedAt' => $this->archived_at?->toIso8601String(),
            'createdAt' => $this->created_at?->toIso8601String(),
            'updatedAt' => $this->updated_at?->toIso8601String(),
        ];
    }
}
