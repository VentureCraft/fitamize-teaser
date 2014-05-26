/*
	Overflow 1.1 by HTML5 UP
	html5up.net | @n33co
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

/*********************************************************************************/
/* Settings                                                                      */
/*********************************************************************************/

	var _settings = {

		// Full screen header
			useFullScreenHeader: true,

		// Parallax Background
			useParallax: false,
			parallaxFactor: 2,	// Lower = more intense. Higher = less intense.
			parallaxLimit: 1680,	// Performance tweak: turns off parallax if the viewport width exceeds this value

		// skelJS
			skelJS: {
				prefix: 'css/style',
				resetCSS: true,
				boxModel: 'border',
				useOrientation: true,
				containers: 1140,
				grid: {
					gutters: 40
				},
				breakpoints: {
					//'widest': { range: '*', containers: 1140, hasStyleSheet: false },
					//'wide': { range: '-1680', containers: 960 },
					'normal': { range: '-1280', containers: '95%',grid: {}},
					//'narrow': { range: '-840', containers: '95%', grid: { gutters: 30 } },
					'mobile': { range: '-900', lockViewport: true, containers: '90%', grid: { collapse: true, gutters: 20 } }
				}
			},

		
	};

/*********************************************************************************/
/* jQuery Plugins                                                                */
/*********************************************************************************/

	// scrolly
		jQuery.fn.n33_scrolly = function(offset) {				
			
			jQuery(this).click(function(e) {
				var t = jQuery(this), h = t.attr('href'), target;

				if (h.charAt(0) == '#' && h.length > 1 && (target = jQuery(h)).length > 0)
				{
					var x, pos;
					
					x = target.offset().top;
					
					if (t.hasClass('scrolly-centered'))
						pos = x - (($(window).height() - target.outerHeight()) / 2);
					else
					{
						pos = Math.max(x, 0);
						
						if (offset)
						{
							if (typeof(offset) == 'function')
								pos -= (offset)();
							else
								pos -= offset;
						}
					}
					
					e.preventDefault();
					
					jQuery('body,html').animate({ scrollTop: pos }, 800, 'swing');
				}
			});
		};

/*********************************************************************************/
/* Initialize                                                                    */
/*********************************************************************************/

	// skelJS
		skel.init(_settings.skelJS);

	// jQuery
		jQuery(function() {

			var	$window = $(window),
				$body = $('body');
				$menu = $('#menu');
				$header = $('#header');

				$window.load(function() {
				$body.removeClass('loading');
			});

			// Scrolly links
				$('.scrolly').n33_scrolly(function() {
					return (skel.isActive('mobile') ? 70 : 190);
				});

			// Forms
				if (skel.vars.IEVersion < 10)
					$('form').n33_formerize();



			// Full Screen Header
				if (_settings.useFullScreenHeader)
				{
					var $header = $('#header');
					
					if ($header.length > 0)
					{
						var $header_header = $header.find('header');
						
						$window
							.on('resize.overflow_fsh', function() {
								if (skel.isActive('mobile'))
									$header.css('padding', '');
								else
								{
									var p = Math.max(192, ($window.height() - $header_header.outerHeight()) / 2);
									$header.css('padding', p + 'px 0 ' + p + 'px 0');
								}
							})
							.trigger('resize.overflow_fsh');
							
						$window.load(function() {
							$window.trigger('resize.overflow_fsh');
						});
					}
				}
				
			// Parallax Background
				if (_settings.useParallax)
				{
					var $dummy = $(), $bg;
				
					$window
						.on('scroll.overflow_parallax', function() {
							$bg.css('background-position', 'center ' + (-1 * (parseInt($window.scrollTop()) / _settings.parallaxFactor)) + 'px');
						})
						.on('resize.overflow_parallax', function() {
							if ($window.width() > _settings.parallaxLimit
							||	skel.isActive('narrow'))
							{
								$body.css('background-position', '');
								$bg = $dummy;
							}
							else
								$bg = $body;
						})
						.trigger('resize.overflow_parallax');

					// IE's smooth scroll kind of screws this up, so we have to turn it off.
						if (skel.vars.IEVersion < 11)
							$window.unbind('scroll.overflow_parallax');
				}

				// menu stuff
				if (!skel.vars.isTouch && $menu.hasClass('alt') && $header.length > 0) {

					$window.on('load', function() {

					// scrollgress v0.2 | (c) n33 | n33.co @n33co | MIT
						(function(){var e="scrollwatch",t="length",n="top",r=null,i="scrollgress",s="data",o="scrollwatch-state",u="range",a="anchor",f="unscrollwatch",l="unscrollgress",c="removeData",h="element",p="-id",d="scroll.",v="height",m="scrollTop",g="center",y="bottom",b=$(window),w=$(document),E=1e3;$.fn[e]=function(f){var l,c,h,p;if(this[t]>1){for(l=0;l<this[t];l++)$(this[l])[e](f);return this}return c=$.extend({range:.5,anchor:n,init:r,on:r,off:r,delay:0},f),h=$(this),c.init&&c.init(h),h[s](o,-1)[i](function(e){window.clearTimeout(p),p=window.setTimeout(function(){var t=parseInt(h[s](o));if(t==0||t==-1)if(e>=-1*c[u]&&e<=c[u]){h[s](o,1),c.on&&c.on(h);return}if(t==1||t==-1)if(e<-1*c[u]||e>=c[u]){h[s](o,0),c.off&&c.off(h);return}},c.delay)},{anchor:c[a]},e),h},$.fn[f]=function(){var n,r;if(this[t]>1){for(n=0;n<this[t];n++)$(this[n])[f]();return this}return r=$(this),r[c](o,0)[l](e),r},$.fn[i]=function(e,r,o){var u,f,l,c,S;if(this[t]>1){for(u=0;u<this[t];u++)$(this[u])[i](e,r,o);return this}return o||(o=i),f=$.extend({anchor:n,direction:"both",scope:h,easing:0},r),l=$(this),l[s](o+p)||l[s](o+p,E++),c=l[s](o+p),S=d+o+"-"+c,b.off(S).on(S,function(){var t,r=l.offset()[n],i=l.outerHeight(),s=w[v]();switch(f.scope){default:case h:switch(f[a]){default:case n:t=(r-b[m]())/i*-1;break;case g:t=(r-b[m]()-(b[v]()-i)/2)/i*-1;break;case y:t=(r-b[m]()-(b[v]()-i))/i*-1}break;case"window":switch(f[a]){default:case n:t=(r-b[m]())/b[v]()*-1;break;case g:t=(r-b[m]()-(b[v]()-i)/2)/b[v]()*-1;break;case y:t=(r-b[m]()-(b[v]()-i))/b[v]()*-1}}f.direction=="forwards"?t=Math.max(0,t):f.direction=="backwards"&&(t=Math.min(0,t)),t>0?t=Math.max(0,t-f.easing/100):t<0&&(t=Math.min(0,t+f.easing/100)),e(t,l)}).trigger("scroll"),l},$.fn[l]=function(e){var n,r,o,u;if(this[t]>1){for(n=0;n<this[t];n++)$(this[n])[l](e);return this}return e||(e=i),r=$(this),r[s](e+p)?(o=r[s](e+p),u=d+e+"-"+o,b.off(u),r[c](e+p),r):r}})();

					// Apply scrollgress to banner.
						$header.scrollwatch({
							delay:		0,
							range:		1,
							anchor:		'top',
							on:			function() { $menu.addClass('alt reveal'); },
							off:		function() { $menu.removeClass('alt'); }
						});

				});

				}

				$('#team .team-member').on('click',function(e) {

					var target = $(this).attr('div-target');

					$("."+target).show().siblings().hide();

				});


			

		});