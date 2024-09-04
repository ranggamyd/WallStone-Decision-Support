<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comparison extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function criteria1()
    {
        return $this->belongsTo(Criteria::class, 'criteria_id_1');
    }

    public function criteria2()
    {
        return $this->belongsTo(Criteria::class, 'criteria_id_2');
    }
}
