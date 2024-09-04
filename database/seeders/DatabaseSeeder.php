<?php

namespace Database\Seeders;

use App\Models\Alternative;
use App\Models\Criteria;
use App\Models\Product;
use App\Models\ProductAlternative;
use App\Models\Score;
use App\Models\SubCriteria;
use App\Models\User;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(5)->create();

        User::insert([
            'name' => 'Administrator',
            'username' => 'admin',
            'email' => 'admin@admin',
            'password' => Hash::make('admin'),
        ]);

        Product::insert([
            [
                'code' => 'P0001',
                'name' => 'Dinding Luar',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'P0002',
                'name' => 'Dinding Dalam',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'P0003',
                'name' => 'Dinding Aksen',
                'description' => fake()->sentence(),
            ]
        ]);

        Alternative::insert([
            [
                'code' => 'A0001',
                'name' => 'Batu Andesit',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'A0002',
                'name' => 'Batu Marmer',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'A0003',
                'name' => 'Batu Kapur',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'A0004',
                'name' => 'Batu Palimanan',
                'description' => fake()->sentence(),
            ],
            [
                'code' => 'A0005',
                'name' => 'Batu Granit',
                'description' => fake()->sentence(),
            ]
        ]);

        Criteria::insert([
            [
                'code' => 'C0001',
                'name' => 'Kekerasan',
                'type' => 'Benefit',
            ],
            [
                'code' => 'C0002',
                'name' => 'Daya Tahan',
                'type' => 'Benefit',
            ],
            [
                'code' => 'C0003',
                'name' => 'Tekstur',
                'type' => 'Benefit',
            ],
            [
                'code' => 'C0004',
                'name' => 'Ketersediaan',
                'type' => 'Benefit',
            ],
            [
                'code' => 'C0005',
                'name' => 'Harga',
                'type' => 'Cost',
            ]
        ]);

        SubCriteria::insert([
            [
                'criteria_id' => 1,
                'name' => 'Sangat Keras',
                'value' => 4,
            ],
            [
                'criteria_id' => 1,
                'name' => 'Cukup Keras',
                'value' => 3,
            ],
            [
                'criteria_id' => 1,
                'name' => 'Kurang Keras',
                'value' => 2,
            ],
            [
                'criteria_id' => 1,
                'name' => 'Tidak Keras',
                'value' => 1,
            ],
            [
                'criteria_id' => 2,
                'name' => 'Sangat Awet',
                'value' => 4,
            ],
            [
                'criteria_id' => 2,
                'name' => 'Cukup Awet',
                'value' => 3,
            ],
            [
                'criteria_id' => 2,
                'name' => 'Kurang Awet',
                'value' => 2,
            ],
            [
                'criteria_id' => 2,
                'name' => 'Tidak Awet',
                'value' => 1,
            ],
            [
                'criteria_id' => 3,
                'name' => 'Sangat Kasar',
                'value' => 4,
            ],
            [
                'criteria_id' => 3,
                'name' => 'Cukup Kasar',
                'value' => 3,
            ],
            [
                'criteria_id' => 3,
                'name' => 'Cukup Halus',
                'value' => 2,
            ],
            [
                'criteria_id' => 3,
                'name' => 'Sangat Halus',
                'value' => 1,
            ],
            [
                'criteria_id' => 4,
                'name' => 'Mudah Didapat',
                'value' => 4,
            ],
            [
                'criteria_id' => 4,
                'name' => 'Cukup Mudah',
                'value' => 3,
            ],
            [
                'criteria_id' => 4,
                'name' => 'Cukup Sulit',
                'value' => 2,
            ],
            [
                'criteria_id' => 4,
                'name' => 'Sulit Didapat',
                'value' => 1,
            ],
            [
                'criteria_id' => 5,
                'name' => 'Rp. 250.000,- s/d Rp. 2.500.000,-',
                'value' => 4,
            ],
            [
                'criteria_id' => 5,
                'name' => 'Rp. 200.000,- s/d Rp. 2.000.000,-',
                'value' => 3,
            ],
            [
                'criteria_id' => 5,
                'name' => 'Rp. 150.000,- s/d Rp. 1.500.000,-',
                'value' => 2,
            ],
            [
                'criteria_id' => 5,
                'name' => 'Rp. 100.000,- s/d Rp. 1.000.000,-',
                'value' => 1,
            ]
        ]);

        ProductAlternative::insert([
            [
                'product_id' => 1,
                'alternative_id' => 1,
            ],
            [
                'product_id' => 1,
                'alternative_id' => 5,
            ],
            [
                'product_id' => 2,
                'alternative_id' => 2,
            ],
            [
                'product_id' => 2,
                'alternative_id' => 3,
            ],
            [
                'product_id' => 3,
                'alternative_id' => 2,
            ],
            [
                'product_id' => 3,
                'alternative_id' => 4,
            ],
        ]);

        Score::insert([
            ['alternative_id' => 1, 'criteria_id' => 1, 'value' => 4,],
            ['alternative_id' => 1, 'criteria_id' => 2, 'value' => 4,],
            ['alternative_id' => 1, 'criteria_id' => 3, 'value' => 3,],
            ['alternative_id' => 1, 'criteria_id' => 4, 'value' => 3,],
            ['alternative_id' => 1, 'criteria_id' => 5, 'value' => 2,],

            ['alternative_id' => 2, 'criteria_id' => 1, 'value' => 3,],
            ['alternative_id' => 2, 'criteria_id' => 2, 'value' => 3,],
            ['alternative_id' => 2, 'criteria_id' => 3, 'value' => 4,],
            ['alternative_id' => 2, 'criteria_id' => 4, 'value' => 2,],
            ['alternative_id' => 2, 'criteria_id' => 5, 'value' => 1,],

            ['alternative_id' => 3, 'criteria_id' => 1, 'value' => 2,],
            ['alternative_id' => 3, 'criteria_id' => 2, 'value' => 2,],
            ['alternative_id' => 3, 'criteria_id' => 3, 'value' => 3,],
            ['alternative_id' => 3, 'criteria_id' => 4, 'value' => 3,],
            ['alternative_id' => 3, 'criteria_id' => 5, 'value' => 3,],

            ['alternative_id' => 4, 'criteria_id' => 1, 'value' => 2,],
            ['alternative_id' => 4, 'criteria_id' => 2, 'value' => 3,],
            ['alternative_id' => 4, 'criteria_id' => 3, 'value' => 4,],
            ['alternative_id' => 4, 'criteria_id' => 4, 'value' => 3,],
            ['alternative_id' => 4, 'criteria_id' => 5, 'value' => 3,],

            ['alternative_id' => 5, 'criteria_id' => 1, 'value' => 4,],
            ['alternative_id' => 5, 'criteria_id' => 2, 'value' => 4,],
            ['alternative_id' => 5, 'criteria_id' => 3, 'value' => 4,],
            ['alternative_id' => 5, 'criteria_id' => 4, 'value' => 3,],
            ['alternative_id' => 5, 'criteria_id' => 5, 'value' => 2,],
        ]);
    }
}
