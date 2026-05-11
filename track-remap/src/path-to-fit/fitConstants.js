/** FIT semicircle units → degrees */
export const SEMICIRCLES_TO_DEG = 180 / (2 ** 31);

/** Degrees → FIT semicircle units */
export const DEG_TO_SEMICIRCLES = (2 ** 31) / 180;

export const RECORD_POSITION_KEYS = ['timestamp', 'position_lat', 'position_long', 'distance', 'speed', 'altitude', 'enhanced_altitude'];

/** Non-position keys supported by FitWriter for record copying (unsupported keys cause .num to throw) */
export const RECORD_COPY_KEYS = ['heart_rate', 'cadence', 'fractional_cadence', 'power', 'calories', 'enhanced_altitude', 'enhanced_speed', 'grade', 'gps_accuracy', 'vertical_speed', 'resistance', 'temperature', 'cycles', 'total_cycles', 'accumulated_power', 'grit', 'flow'];

/** Summary keys supported by FitWriter for session (only those not overwritten) */
export const SESSION_COPY_KEYS = ['sport', 'sport_profile_name', 'total_calories', 'total_fat_calories', 'avg_speed', 'max_speed', 'avg_heart_rate', 'max_heart_rate', 'avg_cadence', 'max_cadence', 'avg_power', 'max_power', 'total_ascent', 'total_descent', 'normalized_power', 'training_stress_score', 'intensity_factor', 'total_work', 'avg_altitude', 'max_altitude', 'min_altitude', 'total_moving_time', 'trigger', 'num_laps'];

/** Summary keys supported by FitWriter for lap (sub_sport is always output as virtual_activity) */
export const LAP_COPY_KEYS = ['sport', 'total_calories', 'total_fat_calories', 'avg_speed', 'max_speed', 'avg_heart_rate', 'max_heart_rate', 'avg_cadence', 'max_cadence', 'avg_power', 'max_power', 'total_ascent', 'total_descent', 'intensity', 'lap_trigger', 'normalized_power', 'total_work', 'avg_altitude', 'max_altitude', 'min_altitude', 'total_moving_time', 'num_lengths'];

/** Session/lap keys overridden from the heart-rate FIT (HR, training effect, ascent/descent, etc. Cadence, power, and calories are kept from the route FIT) */
export const SESSION_SENSOR_OVERRIDE_KEYS = ['avg_heart_rate', 'max_heart_rate', 'total_ascent', 'total_descent', 'normalized_power', 'training_stress_score', 'intensity_factor', 'total_work', 'avg_altitude', 'max_altitude', 'min_altitude', 'trigger', 'num_laps'];
export const LAP_SENSOR_OVERRIDE_KEYS = ['avg_heart_rate', 'max_heart_rate', 'total_ascent', 'total_descent', 'intensity', 'lap_trigger', 'normalized_power', 'total_work', 'avg_altitude', 'max_altitude', 'min_altitude', 'num_lengths'];
