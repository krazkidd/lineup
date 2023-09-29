const titularizeRegex = new RegExp(/[_-]/g);

export const emojis = [
    'angry_face',
    'angry_face_with_horns',
    'anguished_face',
    'anxious_face_with_sweat',
    'astonished_face',
    'beaming_face_with_smiling_eyes',
    'clown_face',
    'cold_face',
    'confounded_face',
    'confused_face',
    'cowboy_hat_face',
    'crying_face',
    'disappointed_face',
    'disguised_face',
    'dotted_line_face',
    'downcast_face_with_sweat',
    'drooling_face',
    'exploding_head',
    'expressionless_face',
    'face_blowing_a_kiss',
    'face_exhaling',
    'face_holding_back_tears',
    'face_savoring_food',
    'face_screaming_in_fear',
    'face_vomiting',
    'face_with_diagonal_mouth',
    'face_with_hand_over_mouth',
    'face_with_head-bandage',
    'face_with_monocle',
    'face_with_open_eyes_and_hand_over_mouth',
    'face_with_open_mouth',
    'face_without_mouth',
    'face_with_peeking_eye',
    'face_with_raised_eyebrow',
    'face_with_rolling_eyes',
    'face_with_spiral_eyes',
    'face_with_steam_from_nose',
    'face_with_symbols_on_mouth',
    'face_with_tears_of_joy',
    'face_with_thermometer',
    'face_with_tongue',
    'fearful_face',
    'flushed_face',
    'frowning_face',
    'frowning_face_with_open_mouth',
    'grimacing_face',
    'grinning_face',
    'grinning_face_with_smiling_eyes',
    'grinning_face_with_sweat',
    'grinning_squinting_face',
    'hot_face',
    'hugging_face',
    'hushed_face',
    'kissing_face_with_closed_eyes',
    'kissing_face_with_smiling_eyes',
    'knocked-out_face',
    'loudly_crying_face',
    'melting_face',
    'nerd_face',
    'neutral_face',
    'partying_face',
    'pensive_face',
    'pleading_face',
    'relieved_face',
    'sad_but_relieved_face',
    'shushing_face',
    'sleeping_face',
    'sleepy_face',
    'slightly_frowning_face',
    'slightly_smiling_face',
    'smiling_face',
    'smiling_face_with_halo',
    'smiling_face_with_heart-eyes',
    'smiling_face_with_hearts',
    'smiling_face_with_horns',
    'smiling_face_with_smiling_eyes',
    'smiling_face_with_sunglasses',
    'smiling_face_with_tear',
    'smirking_face',
    'squinting_face_with_tongue',
    'thinking_face',
    'tired_face',
    'unamused_face',
    'upside-down_face',
    'weary_face',
    'winking_face',
    'winking_face_with_tongue',
    'worried_face',
    'yawning_face',
    'zany_face',
    'zipper-mouth_face',
    'rolling_on_the_floor_laughing',
    'star-struck',

    'sun_with_face',
    'full_moon_face',
    'new_moon_face',

    'cat_face',
    'cow_face',
    'dog_face',
    'fox',
    'frog',
    'monkey_face',
    'panda',
    'pig_face',
    'tiger_face',

    'alien',

    'bat',
    'ghost',
    'jack-o-lantern',

    'red_heart',
    'sparkling_heart',

    'party_popper',
    'pile_of_poo',

    'softball',
];

export const emojiTitles: any = {};

emojis.forEach(emoji => {
    emojiTitles[emoji] = emoji.replace(titularizeRegex, ' ');
});