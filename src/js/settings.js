export let settings = {
    W: 512,
    H: 512,
    restore_faces: true,
    tiling: false,
    enable_hr: false,
    firstphase_width: 0,
    firstphase_height: 0,
    seed: 1791933551,
    sampler: "Euler a",
    seed_enable_extras: false,
    subseed: -1,
    subseed_strength: 0,
    seed_resize_from_w: 0,
    seed_resize_from_h: 0,
    steps: 30,
    ddim_eta: 0.0,
    n_batch: 1,
    make_grid: false,
    grid_rows: 1,
    save_settings: true,
    save_samples: false,
    display_samples: false,
    save_sample_per_step: false,
    show_sample_per_step: false,
    override_these_with_webui: false,
    batch_name: "2022 09 12 Animation 1",
    filename_format: "{timestring}_{index}_{prompt}.png",
    seed_behavior: "fixed",
    use_init: false,
    from_img2img_instead_of_link: false,
    strength_0_no_init: true,
    strength: 0.0,
    init_image: null,
    use_mask: false,
    use_alpha_as_mask: false,
    invert_mask: false,
    overlay_mask: true,
    mask_file: "https://www.filterforge.com/wiki/images/archive/b/b7/20080927223728%21Polygonal_gradient_thumb.jpg",
    mask_contrast_adjust: 1.0,
    mask_brightness_adjust: 1.0,
    mask_overlay_blur: 5.0,
    fill: 1,
    full_res_mask: true,
    full_res_mask_padding: 4,
    precision: "autocast",
    scale: 7,
    C: 4,
    f: 8,
    prompt: "",
    timestring: "20221209174547",
    init_latent: null,
    init_sample: null,
    init_c: null,
    outdir: "C:\\Users\\PC\\Desktop\\stable-diffusion-webui-master\\outputs/img2img-images\\2022 09 12 Animation 1",
    prompts: {
    },
    animation_mode: "3D",
    max_frames: 1000,
    border: "replicate",
    angle: "0:(0)",
    zoom: "0:(1.02+0.02*sin(2*3.14*t/20))",
    translation_x: "0:(0), 4:(5), 7:(0), 399:(0), 400:(-2), 410:(0)",
    translation_y: "0:(0), 19:(0), 20:(-1), 25:(0)",
    translation_z: "0:(-10), 4:(1), 7:(2), 14:(10), 19:(1), 20:(10), 59:(10), 60:(1), 61:(2), 172:(2), 173:(1), 199:(1), 200:(10), 209:(10), 210:(2), 349:(2), 360:(10)",
    rotation_3d_x: "0:(0), 4:(1), 7:(0), 199:(0), 200:(3), 215:(0), 329:(0), 330:(1),  340:(0)",
    rotation_3d_y: "0:(0), 100:(0), 101:(1), 110:(0), 120:(-1), 165:(0), 329:(0), 330:(-1), 340:(0)",
    rotation_3d_z: "0:(0), 74:(0), 75:(3.6), 100:(3.6), 101:(0), 199:(0), 200:(3), 215:(0), 349:(0), 350:(1.8), 375:(0), 399:(0), 400:(-2.5), 418:(0)",
    flip_2d_perspective: false,
    perspective_flip_theta: "0:(0)",
    perspective_flip_phi: "0:(t%15)",
    perspective_flip_gamma: "0:(0)",
    perspective_flip_fv: "0:(53)",
    noise_schedule: "0: (0.08)",
    strength_schedule: "0: (0.6)",
    contrast_schedule: "0: (1.0)",
    cfg_scale_schedule: "0: (6)",
    fov_schedule: "0: (40)",
    near_schedule: "0: (200)",
    far_schedule: "0: (10000)",
    seed_schedule: "0: (t%4294967293)",
    histogram_matching: true,
    color_coherence: "Match Frame 0 LAB",
    diffusion_cadence: 1,
    use_depth_warping: true,
    midas_weight: 0.3,
    near_plane: 200.0,
    far_plane: 10000.0,
    fov: 40.0,
    padding_mode: "border",
    sampling_mode: "bicubic",
    save_depth_maps: false,
    video_init_path: "/content/video_in.mp4",
    extract_nth_frame: 1,
    overwrite_extracted_frames: false,
    use_mask_video: false,
    video_mask_path: "/content/video_in.mp4",
    interpolate_key_frames: false,
    interpolate_x_frames: 4,
    resume_from_timestring: true,
    resume_timestring: "20221209124942"
}