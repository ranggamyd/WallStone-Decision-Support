<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Criteria extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function subcriterias()
    {
        return $this->hasMany(SubCriteria::class);
    }

    public function comparisons1()
    {
        return $this->hasMany(Comparison::class, 'criteria_id_1');
    }

    public function comparisons2()
    {
        return $this->hasMany(Comparison::class, 'criteria_id_2');
    }

    public function scores()
    {
        return $this->hasMany(Score::class);
    }
}
