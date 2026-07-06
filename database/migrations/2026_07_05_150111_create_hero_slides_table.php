<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('hero_slides', function (Blueprint $table) {
            $table->id();
            $table->string('image')->nullable();
            $table->string('badge')->nullable();
            $table->text('titre');
            $table->text('description')->nullable();
            $table->json('statistiques')->nullable();
            $table->string('carte_titre')->nullable();
            $table->string('carte_date')->nullable();
            $table->json('carte_tags')->nullable();
            $table->string('cta_primary_text')->nullable();
            $table->string('cta_primary_link')->nullable();
            $table->string('cta_secondary_text')->nullable();      // ← AJOUT
            $table->string('cta_secondary_link')->nullable();      // ← AJOUT
            $table->integer('ordre')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hero_slides');
    }
};
