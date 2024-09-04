<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function alternatives()
    {
        return $this->belongsToMany(Alternative::class, 'product_alternatives', 'product_id', 'alternative_id');
    }
}
