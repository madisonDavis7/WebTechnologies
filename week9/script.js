$(document).ready(function () {
  // Image system
  const images = [
    'images/dream1.jpg',
    'images/dream2.jpg',
    'images/dream3.jpg'
  ];
  let imgIndex = 0;
  const $image = $('#dream-image');
  const $imageContainer = $('#image-container');

  function randomPosition(maxWidth, maxHeight) {
    return {
      left: Math.random() * maxWidth,
      top: Math.random() * maxHeight
    };
  }

function animateImageSmooth() {
  // Fade out current image
  $image.fadeOut(800, () => {
    // Switch to next image in array
    imgIndex = (imgIndex + 1) % images.length;
    $image.attr('src', images[imgIndex]);

    // Randomize position for fade-in start
    const pos = randomPosition($(window).width() - $image.width(), $(window).height() - $image.height());
    $image.css({ left: pos.left, top: pos.top });

    // Fade in new image
    $image.fadeIn(800, () => {
      // Animate a small move while visible
      const newPos = randomPosition($(window).width() - $image.width(), $(window).height() - $image.height());
      $image.animate({ left: newPos.left, top: newPos.top }, 2000, 'swing', () => {
        // Fade out again quickly for smoother cycling
        $image.fadeOut(600, () => {
          // Switch position slightly before fade-in
          const nextPos = randomPosition($(window).width() - $image.width(), $(window).height() - $image.height());
          $image.css({ left: nextPos.left, top: nextPos.top });

          // Fade in again
          $image.fadeIn(600, () => {
            // Animate another small move before next full cycle
            const finalPos = randomPosition($(window).width() - $image.width(), $(window).height() - $image.height());
            $image.animate({ left: finalPos.left, top: finalPos.top }, 2000, 'swing', () => {
              // After all these smaller fades and moves, restart the cycle
              setTimeout(animateImageSmooth, 1000);
            });
          });
        });
      });
    });
  });
}


  // Initialize image src and start animation
 $image.attr('src', images[imgIndex]).css({ position: 'absolute' });
animateImageSmooth();

  // Text system
  const texts = [
    "Chasing dreams...",
    "Whispers of the night",
    "Floating on clouds",
    "Stars guide the way",
    "Sleep Forever..."
  ];
  let textIndex = 0;
  const $text = $('#text-container');

  function animateText() {
    // Update text content
    $text.text(texts[textIndex])
      .css({ left: 0, top: Math.random() * ($(window).height() - 50) }) // random vertical position
      .show();

    // Animate text moving across the screen horizontally
    $text.animate({ left: $(window).width() - $text.width() }, 4000, 'linear', () => {
      // After animation, update index and restart
      textIndex = (textIndex + 1) % texts.length;
      setTimeout(animateText, 1000);
    });
  }

  animateText();

  // Shape system
  const shapes = ['circle', 'square', 'triangle'];
  let shapeIndex = 0;
  const $shape = $('#shape-container');

function animateShapeFlow() {
  // Fade out shape smoothly
  $shape.fadeOut(800, () => {
    // Switch to next shape class
    shapeIndex = (shapeIndex + 1) % shapes.length;
    const shapeClass = shapes[shapeIndex];
    
    $shape.removeClass('circle square triangle').addClass(shapeClass);

    // Randomize base size for shape
    const baseSize = 60 + Math.random() * 80;
    $shape.css({ width: baseSize, height: baseSize });

    // Randomize initial position inside viewport
    const pos = randomPosition($(window).width() - baseSize, $(window).height() - baseSize);
    $shape.css({ left: pos.left, top: pos.top, position: 'absolute' });

    // Fade in shape smoothly
    $shape.fadeIn(800, () => {
      // Animate move + pulsing scale together
      const newPos = randomPosition($(window).width() - baseSize, $(window).height() - baseSize);

      // Animate position
      $shape.animate({ left: newPos.left, top: newPos.top }, 4000, 'swing');

      // Animate pulsing scale: grow then shrink repeatedly
      function pulseGrow() {
        $shape.animate({ width: baseSize * 1.15, height: baseSize * 1.15 }, 2000, 'swing', pulseShrink);
      }
      function pulseShrink() {
        $shape.animate({ width: baseSize, height: baseSize }, 2000, 'swing', pulseGrow);
      }
      pulseGrow();

      // After move finishes, stop pulsing and restart cycle
      setTimeout(() => {
        $shape.stop(true, true);
        // Reset size to base size 
        $shape.css({ width: baseSize, height: baseSize });
        setTimeout(animateShapeFlow, 500);
      }, 4000);
    });
  });
}

 animateShapeFlow();
});
