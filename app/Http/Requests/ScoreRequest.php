<?php

namespace App\Http\Requests;

use Illuminate\Validation\Rule;
use Illuminate\Foundation\Http\FormRequest;

class ScoreRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'alternative_id' => ['required', Rule::exists('alternatives', 'id')
                ->where('id', $this->query('alternative_id'))],
            'criteria_id' => ['required', Rule::exists('criterias', 'id')
                ->where('id', $this->query('criteria_id'))],
            'value' => ['required', 'numeric', 'min:1', 'max:9'],
        ];

        return $rules;
    }
}
