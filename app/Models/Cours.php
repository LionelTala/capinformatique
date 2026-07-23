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

        'student_id',
        'tranche_requise_id',
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
    public function trancheRequise()
    {
        return $this->belongsTo(Tranche::class, 'tranche_requise_id');
    }

    public function vues()
    {
        return $this->hasMany(CoursVue::class);
    }
    public function student()
    {
        return $this->belongsTo(Student::class, 'student_id');
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
    public function lessons()
    {
        return $this->hasMany(Lesson::class)->orderBy('order');
    }

    public function getIsVideoAttribute(): bool
    {
        return !empty($this->video_url);
    }

    // app/Models/Cours.php

public function getEmbedVideoUrlAttribute()
{
    if (!$this->video_url) return null;

    // YouTube
    if (strpos($this->video_url, 'youtube.com/watch?v=') !== false) {
        parse_str(parse_url($this->video_url, PHP_URL_QUERY), $params);
        if (isset($params['v'])) {
            // ✅ Paramètres pour un lecteur propre
            // rel=0 : pas de vidéos suggérées
            // modestbranding=1 : logo YouTube réduit (disparait presque)
            // showinfo=0 : pas d'infos
            // controls=1 : afficher les contrôles
            // autoplay=0 : ne pas jouer automatiquement
            // iv_load_policy=3 : pas d'annotations
            return 'https://www.youtube.com/embed/' . $params['v'] . '?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0&iv_load_policy=3';
        }
    }

    // YouTube short (youtu.be)
    if (strpos($this->video_url, 'youtu.be/') !== false) {
        $videoId = substr(parse_url($this->video_url, PHP_URL_PATH), 1);
        return 'https://www.youtube.com/embed/' . $videoId . '?rel=0&modestbranding=1&showinfo=0&controls=1&autoplay=0&iv_load_policy=3';
    }

    // Vimeo
    if (strpos($this->video_url, 'vimeo.com/') !== false) {
        $videoId = substr(parse_url($this->video_url, PHP_URL_PATH), 1);
        return 'https://player.vimeo.com/video/' . $videoId . '?title=0&byline=0&portrait=0';
    }

    return null;
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
