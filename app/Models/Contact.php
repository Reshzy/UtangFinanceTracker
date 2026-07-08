<?php

namespace App\Models;

use Database\Factories\ContactFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Carbon;

/**
 * @property int $id
 * @property int $workspace_id
 * @property string $full_name
 * @property string|null $nickname
 * @property string|null $phone
 * @property string|null $address
 * @property string|null $relationship
 * @property string|null $facebook
 * @property Carbon|null $birthday
 * @property string|null $notes
 * @property array<int, string>|null $tags
 * @property Carbon|null $archived_at
 * @property Carbon|null $created_at
 * @property Carbon|null $updated_at
 * @property Carbon|null $deleted_at
 */
#[Fillable([
    'workspace_id',
    'full_name',
    'nickname',
    'phone',
    'address',
    'relationship',
    'facebook',
    'birthday',
    'notes',
    'tags',
    'archived_at',
])]
class Contact extends Model
{
    /** @use HasFactory<ContactFactory> */
    use HasFactory, SoftDeletes;

    /**
     * Retrieve the model for a bound value.
     */
    public function resolveRouteBinding($value, $field = null): ?static
    {
        $user = auth()->user();

        if ($user === null) {
            return null;
        }

        return static::query()
            ->whereHas('workspace', fn ($query) => $query->where('user_id', $user->id))
            ->where($field ?? $this->getRouteKeyName(), $value)
            ->first();
    }

    /**
     * Scope a query to active contacts.
     *
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeActive($query)
    {
        return $query->whereNull('archived_at');
    }

    /**
     * Scope a query to archived contacts.
     *
     * @param  Builder<static>  $query
     * @return Builder<static>
     */
    public function scopeArchived($query)
    {
        return $query->whereNotNull('archived_at');
    }

    public function workspace(): BelongsTo
    {
        return $this->belongsTo(Workspace::class);
    }

    public function loans(): HasMany
    {
        return $this->hasMany('App\\Models\\Loan');
    }

    public function financialActivities(): HasMany
    {
        return $this->hasMany('App\\Models\\FinancialActivity');
    }

    public function timelineNotes(): HasMany
    {
        return $this->hasMany('App\\Models\\Note');
    }

    public function reminders(): HasMany
    {
        return $this->hasMany('App\\Models\\Reminder');
    }

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'workspace_id' => 'integer',
            'birthday' => 'date',
            'tags' => 'array',
            'archived_at' => 'datetime',
            'created_at' => 'datetime',
            'updated_at' => 'datetime',
            'deleted_at' => 'datetime',
        ];
    }
}
