<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Cours extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'description',
        'contenu',
        'video_url',
        'video_title',
        'formation_id',
        'vague_id',
        'certification_id',
        'type',
        'is_active',
        'order',
        'viewed_count',
        'has_notification_sent',
        'notification_sent_at',
    ];

    protected $casts = [
        'contenu' => 'array',
        'is_active' => 'boolean',
        'has_notification_sent' => 'boolean',
        'notification_sent_at' => 'datetime',
    ];

    // Relations
    public function formation()
    {
        return $this->belongsTo(Formation::class);
    }

    public function vague()
    {
        return $this->belongsTo(Vague::class);
    }

    public function certification()
    {
        return $this->belongsTo(Certification::class);
    }

    public function vues()
    {
        return $this->hasMany(CoursVue::class);
    }

    public function notifications()
    {
        return $this->hasMany(CoursNotification::class);
    }

    // Accesseurs
    public function getStudentsAttribute()
{
    if ($this->type === 'vague' && $this->vague_id) {
        return Student::where('vague_id', $this->vague_id)->get();
    }

    if ($this->type === 'certification' && $this->certification_id) {
        return Student::where('certification_id', $this->certification_id)->get();
    }

    return collect();
}

public function getViewedStudentsAttribute()
{
    return $this->vues()->with('student')->get()->pluck('student');
}

public function getNotViewedStudentsAttribute()
{
    $viewedIds = $this->vues()->pluck('student_id');
    return $this->students->reject(function ($student) use ($viewedIds) {
        return $viewedIds->contains($student->id);
    });
}



 

    public function getReadNotificationsAttribute()
    {
        return $this->notifications()->where('is_read', true)->get();
    }

    public function getUnreadNotificationsAttribute()
    {
        return $this->notifications()->where('is_read', false)->get();
    }

    public function getIsVideoAttribute(): bool
    {
        return !empty($this->video_url);
    }

    public function getEmbedVideoUrlAttribute(): ?string
    {
        if (!$this->video_url) {
            return null;
        }

        // YouTube
        if (preg_match('/youtube\.com\/watch\?v=([^&]+)/', $this->video_url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        // YouTube short
        if (preg_match('/youtu\.be\/([^?]+)/', $this->video_url, $matches)) {
            return 'https://www.youtube.com/embed/' . $matches[1];
        }

        // Vimeo
        if (preg_match('/vimeo\.com\/(\d+)/', $this->video_url, $matches)) {
            return 'https://player.vimeo.com/video/' . $matches[1];
        }

        return $this->video_url;
    }

    public function getVideoThumbnailAttribute(): ?string
    {
        if (!$this->video_url) {
            return null;
        }

        // YouTube
        if (preg_match('/youtube\.com\/watch\?v=([^&]+)/', $this->video_url, $matches)) {
            return 'https://img.youtube.com/vi/' . $matches[1] . '/hqdefault.jpg';
        }

        if (preg_match('/youtu\.be\/([^?]+)/', $this->video_url, $matches)) {
            return 'https://img.youtube.com/vi/' . $matches[1] . '/hqdefault.jpg';
        }

        return null;
    }
}
