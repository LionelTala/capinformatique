<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Student extends Model
{
    protected $fillable = [
        'user_id',
        'first_name',
        'last_name',
        'phone',
        'matricule',
        'school_level',
        'birth_date',
        'address',
        'city',
        'student_type',
    ];

    protected $casts = [
        'birth_date' => 'date',
    ];

    // Relations
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    // Accesseurs
    public function getFullNameAttribute(): string
    {
        return $this->first_name . ' ' . $this->last_name;
    }

    // Mutateurs
    public function setMatriculeAttribute($value)
    {
        $this->attributes['matricule'] = strtoupper($value);
    }
}
