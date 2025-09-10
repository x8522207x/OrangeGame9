let startY = 0;

$(document).ready(() => {
    window.addEventListener('resize', updateMaxVH);

    $('.modal_wrap').css('display', 'none');
    setTimeout(() => {
        $('.loading').remove();
        $('.modal').toggleClass('hide');
        $('.modal_wrap').css('display', '');
    }, 1000);

    ['.event_banner', '.event_gnb_menu'].forEach(ele => $(ele).on('click', () => {
        $('.event_banner').toggleClass('-open');
    }));

    $('.event_gnb_gamestart').on('click', () => {
        window.open("https://galaxy.beanfun.com/webapi/view/login/twp?redirect_url=https://warsofprasia.beanfun.com/Main");
    });

    $('.detail_btn').on('click', () => {
        window.open("https://warsofprasia-event.beanfun.com/EventAD/EventAD?eventAdId=14425", '_blank');
    });

    $('.img1_btn').on('click', () => {
        window.open("https://warsofprasia-event.beanfun.com/EventAD/EventAD?eventAdId=14426", '_blank');
    });

    $('.btn_fixed').on('click', () => {
        window.open("https://warsofprasia-event.beanfun.com/Event/E20250917/Index", '_blank');
    });

    $('.modal_close').on('click', () => {
        $('.plate_modal').toggleClass('-active');
        $('.modal.type--youtube').toggleClass('hide');
        $('.modal_box_veil').toggleClass('-hide');
        $('.modal').css('opacity', '0');
        $('.youtube--2').remove();
    });

    $('._video-button').on('click', () => {
        openVideo('ku1nIaJ2dTM');
    });

    function pcTouchMove(swiper) {
        return (e) => {
            if ($(window).height() < 911) {
                handleSmallHeight(swiper, e);
            } else {
                swiper.allowTouchMove = true;
            }
        };
    }

    let pcSwiperPage, pcWheelHandler, pcTouchMoveHandler, mobileSwiperPage, bossSwiperPage, soonSwiperPage, petSwiperPage;

    function pcTouchStart(e) {
        startY = e.touches[0].clientY;
    }

    function pcWheel(swiper) {
        return e => {
            e.stopPropagation();
            const currentSlide = swiper.slides[swiper.activeIndex];
            const slideScrollTop = currentSlide.scrollTop;
            const scrollHeight = currentSlide.scrollHeight;
            const clientHeight = currentSlide.clientHeight;
            const isAtTop = slideScrollTop === 0;
            const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);
            if (swiper.realIndex === 0) {
                if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else if ([1, 2, 3, 4, 5, 6].includes(swiper.realIndex)) {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                } else if (isAtBottom && e.deltaY > 0) {
                    swiper.slideTo(swiper.realIndex + 1);
                }
            } else {
                if (isAtTop && e.deltaY < 0) {
                    swiper.slideTo(swiper.realIndex - 1);
                }
            }
        };
    }

    const pcSwiper = () => {
        pcSwiperPage = new Swiper('.fullpage-section', {
            direction: 'vertical',
            touchReleaseOnEdges: true,
            mousewheel: {
                forceToAxis: true,  // 只沿著 Swiper 方向滑動
                releaseOnEdges: false, // 滑到邊界時不要釋放事件
                sensitivity: 1,
            },
            loop: false,
            freeMode: false,
            noSwiping: true,
            noSwipingSelector: 'button',
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                init: (swiper) => {
                    pcTouchMoveHandler = pcTouchMove(swiper);
                    pcWheelHandler = pcWheel(swiper);
                    $('.UNI-footer').clone().appendTo('.section--episode');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80).css('bottom', 0);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });

                    $('._scroll-button').on('click', () => {
                        swiper.slideTo(1);
                    });

                    $('.UNI-footer').css('display', 'none');

                    $(`.page_p8`).on('click', () => {
                        swiper.slideTo(7);
                        handleDepth2Click(0, 1, 1);
                    });

                    const params = new URL(window.location.href).searchParams;

                    if (params.get("redirect") === "1") {
                        setTimeout(() => swiper.slideTo(2));
                    }

                    $('.section--episode ._tab button').on('click', (e) => {
                        const index = $(e.currentTarget).index();
                        $('.section--episode ._tab button').removeClass('-active');
                        $('.section--episode ._tab button')[index].classList.add('-active');
                        $('.depth--2').removeClass('-active');
                        $('.depth--2')[index + 1].classList.add('-active');
                        $('.section--episode ._display ._display-item')[0].style.display = '';
                        $('.section--episode ._display ._display-item')[1].style.display = '';
                        $('.section--episode ._display ._display-item')[index === 0 ? 1 : 0].style.display = 'none';
                    });

                    document.querySelectorAll('.swiper-slide').forEach(node => {
                        node.addEventListener('wheel', pcWheelHandler, { passive: true });
                        node.addEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                        node.addEventListener('touchstart', pcTouchStart, { passive: true });
                    });
                },
                slideChange: (swiper) => {
                    ['-active'].forEach(cl => ['.depth--1'].forEach(ele => $(ele).removeClass(cl)));
                    if (swiper.realIndex !== 5 && swiper.realIndex < 5) {
                        $('.depth--1')[swiper.realIndex].classList.add('-active');
                        $('.depth--2').removeClass('-active');
                    } else if (swiper.realIndex === 5) {
                        $('.depth--2').removeClass('-active');
                        $('.depth--1')[4].classList.add('-active');
                        $('.depth--2')[0].classList.add('-active');
                    } else {
                        if (swiper.realIndex === 6) {
                            $('.depth--2').removeClass('-active');
                        } else {
                            handleDepth2Click(0, 1, 1);
                        }
                        $('.depth--1')[swiper.realIndex - 1].classList.add('-active');
                    }
                    $('.fullpage-section>.swiper-wrapper>.swiper-slide').off('scroll');
                    $('.fullpage-section>.swiper-wrapper>.swiper-slide').removeClass('-scrollable');
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');
                    $('.fullpage-section>.swiper-wrapper>.swiper-slide')[swiper.realIndex].classList.add('-scrollable');

                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        $('.fullpage-section>.swiper-wrapper>.swiper-slide')[0].classList.add('-scrollable');
        pcSwiperPage.slideTo(0);
        $('.depth--1')[0].classList.add('-active');

        for (let i = 0; i < 7; i++) {
            addPageClick(i, pcSwiperPage);
        }

        // 優化 .depth--2 點擊事件，合併為一個函式
        function handleDepth2Click(tabIdx, depthIdx, hideIdx) {
            pcSwiperPage.slideTo(7);
            $('.section--episode ._tab button').removeClass('-active');
            $('.section--episode ._tab button')[tabIdx].classList.add('-active');
            $('.depth--2').removeClass('-active');
            $('.depth--2')[depthIdx].classList.add('-active');
            $('.section--episode ._display ._display-item')[0].style.display = '';
            $('.section--episode ._display ._display-item')[1].style.display = '';
            $('.section--episode ._display ._display-item')[hideIdx].style.display = 'none';
        }
        $('.depth--2').eq(1).on('click', function () {
            handleDepth2Click(0, 1, 1);
        });
        $('.depth--2').eq(2).on('click', function () {
            handleDepth2Click(1, 2, 0);
        });
    };

    const mbSwiper = () => {
        mobileSwiperPage = new Swiper('.fullpage-section', {
            direction: 'vertical',
            slidesPerView: "auto",
            touchReleaseOnEdges: true,
            mousewheel: {
                releaseOnEdges: true,
                enabled: true,
            },
            loop: false,
            freeMode: {
                enabled: true,
                sticky: false,
                momentumBounce: false,
            },
            autoHeight: true,
            speed: 0,
            passiveListeners: true,
            allowTouchMove: true,
            on: {
                init: (swiper) => {
                    $('.UNI-footer').clone().appendTo('.section--episode');
                    $('.UNI-footer')[1]?.remove();
                    $('.UNI-footer').css('z-index', 100).css('position', 'absolute').css('width', '100%').css('height', 80).css('bottom', 0);

                    $('.gotop').on('click', () => {
                        swiper.slideTo(0);
                        swiper.slides.forEach(slide => {
                            slide.scrollTop = 0;
                        })
                    });

                    $('._scroll-button').on('click', () => {
                        swiper.slideTo(1);
                    });

                    const params = new URL(window.location.href).searchParams;

                    if (params.get("redirect") === "1") {
                        setTimeout(() => swiper.slideTo(2));
                    }

                    $('.UNI-footer').css('display', 'none');

                    $('.section--episode ._tab button').on('click', (e) => {
                        const index = $(e.currentTarget).index();
                        $('.section--episode ._tab button').removeClass('-active');
                        $('.section--episode ._tab button')[index].classList.add('-active');
                        $('.depth--2').removeClass('-active');
                        $('.depth--2')[index + 1].classList.add('-active');
                        $('.section--episode ._display ._display-item')[0].style.display = '';
                        $('.section--episode ._display ._display-item')[1].style.display = '';
                        $('.section--episode ._display ._display-item')[index === 0 ? 1 : 0].style.display = 'none';
                    });
                },
                slideChange: (swiper) => {
                    $('.gotop').removeClass('show');
                    $('.UNI-footer').css('display', 'none');

                    if (swiper.realIndex !== 0) {
                        $('.gotop').addClass('show');
                    }

                    if (swiper.realIndex === 7) {
                        $('.UNI-footer').css('display', 'block');
                    }
                },
            }
        });

        mobileSwiperPage.slideTo(0);
    };

    const soonSwiper = () => {
        soonSwiperPage = new Swiper('.section--soon .swiper-container', {
            touchReleaseOnEdges: true,
            mousewheel: false,
            loop: true,
            freeMode: false,
            noSwiping: false,
            noSwipingSelector: 'button',
            navigation: {
                nextEl: '.section--soon .swiper-button-next',
                prevEl: '.section--soon .swiper-button-prev',
            },
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: true,
            on: {
                slideChange: (swiper) => {
                },
            }
        });
    };

    const bossSwiper = () => {
        bossSwiperPage = new Swiper('.section--boss .swiper-container', {
            touchReleaseOnEdges: true,
            mousewheel: false,
            loop: true,
            freeMode: false,
            noSwiping: false,
            noSwipingSelector: 'button',
            // nested: true,
            navigation: {
                nextEl: '.section--boss .swiper-button-next',
                prevEl: '.section--boss .swiper-button-prev',
            },
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: false,
            on: {
                slideChange: (swiper) => {
                    $('.imageSlide').removeClass('show1');
                    $('.imageSlide').removeClass('show2');
                    $('.imageSlide').removeClass('show3');
                    $('.imageSlide').addClass(`show${swiper.realIndex + 1}`);
                },
            }
        });
    };

    const petSwiper = () => {
        petSwiperPage = new Swiper('.section--pet .swiper-container', {
            touchReleaseOnEdges: true,
            mousewheel: false,
            loop: true,
            freeMode: false,
            noSwiping: false,
            noSwipingSelector: 'button',
            navigation: {
                nextEl: '.section--pet .swiper-button-next',
                prevEl: '.section--pet .swiper-button-prev',
            },
            autoHeight: true,
            speed: 1000,
            slidesPerView: 1,
            spaceBetween: 0,
            watchSlidesProgress: true,
            allowTouchMove: true,
            on: {
                slideChange: (swiper) => {

                },
            }
        });
    };

    if ($(window).width() > 768) {
        $('.event_gnb').addClass('type_clear');
        $('.event_gnb').removeClass('type_default');
        pcSwiper();
        $('.fullpage-section').removeClass('-disabled');
    } else {
        $('.event_gnb').removeClass('type_clear');
        $('.event_gnb').addClass('type_default');
        $('.fullpage-section').addClass('-disabled');
        mbSwiper();
        petSwiper();
    }
    bossSwiper();
    soonSwiper();

    function updateMaxVH() {
        const root = document.documentElement;
        const newMaxVh = `${window.innerHeight}px`;
        root.style.setProperty('--maxvh', newMaxVh);
        if (soonSwiperPage) {
            setTimeout(() => soonSwiperPage.update());
        } else {
            setTimeout(() => soonSwiper());
        }

        if (bossSwiperPage) {
            setTimeout(() => bossSwiperPage.update());
        } else {
            setTimeout(() => bossSwiper());
        }

        if ($(window).width() > 768) {
            if (mobileSwiperPage) {
                mobileSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                mobileSwiperPage = null; // 重置為 null
            }

            $('.event_gnb').addClass('type_clear');
            $('.event_gnb').removeClass('type_default');
            $('.fullpage-section').removeClass('-disabled');

            if (pcSwiperPage) {
                setTimeout(() => pcSwiperPage.update());
            } else {
                setTimeout(() => pcSwiper());
            }
        } else {
            if (pcSwiperPage) {
                pcSwiperPage.destroy(true, true); // 銷毀 Swiper 實例
                pcSwiperPage = null; // 重置為 null
                document.querySelectorAll('.swiper-slide').forEach(node => {
                    node.removeEventListener('wheel', pcWheelHandler, { passive: true });
                    node.removeEventListener('touchmove', pcTouchMoveHandler, { passive: true });
                    node.removeEventListener('touchstart', pcTouchStart, { passive: true });
                });
            }

            if (mobileSwiperPage) {
                setTimeout(() => mobileSwiperPage.update());
            } else {
                setTimeout(() => mbSwiper());
            }

            if (petSwiperPage) {
                setTimeout(() => petSwiperPage.update());
            } else {
                setTimeout(() => petSwiper());
            }
            $('.event_gnb').removeClass('type_clear');
            $('.event_gnb').addClass('type_default');
            $('.fullpage-section').addClass('-disabled');
        }
    }
});

const handleSmallHeight = (swiper, event) => {
    swiper.allowTouchMove = false;
    event.stopPropagation();

    const currentY = event.touches[0].clientY;
    let direction = '';
    if (currentY > startY) {
        direction = 'down';  // 向下移动
    } else if (currentY < startY) {
        direction = 'up';    // 向上移动
    }

    const currentSlide = swiper.slides[swiper.activeIndex];
    const slideScrollTop = currentSlide.scrollTop;
    const scrollHeight = currentSlide.scrollHeight;
    const clientHeight = currentSlide.clientHeight;
    const isAtTop = slideScrollTop === 0;
    const isAtBottom = (slideScrollTop + clientHeight >= scrollHeight);

    if (isAtTop) {
        if (swiper.realIndex !== 0) {
            swiper.allowTouchMove = true;
            if (direction === 'down') {
                swiper.slideTo(swiper.realIndex - 1);
            }
        }
    } else if (isAtBottom) {
        swiper.allowTouchMove = true;
        if (direction === 'up') {
            swiper.slideTo(swiper.realIndex + 1);
        }
    }
};

const addPageClick = (index, swiper) => {
    $(`.page_p${index + 1}`).on('click', () => {
        swiper.slideTo(index);
    });
};

const openVideo = (video, path) => {
    $('.plate_modal').toggleClass('-active');
    $('.modal').css('opacity', '1').css('visibility', 'inherit');
    $('.modal.type--youtube').toggleClass('hide');
    $('.modal_box_veil').toggleClass('-hide');
    if (video) {
        $('.modal_source').append(
            `<iframe width="auto" height="auto" class="modal_youtube youtube--2"
        src="https://www.youtube.com/embed/${video}?autoplay=1"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen></iframe>`);
    } else if (path) {
        $('.modal_source').append(
            `<video class="modal_youtube youtube--2" loop autoplay playsinline controls controlslist="nodownload" preload="metadata"><source src=${path} type="video/mp4"></video>`);
    }
};

