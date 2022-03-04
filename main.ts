enum ActionKind {
    Walking,
    Idle,
    Jumping
}
namespace SpriteKind {
    export const Block = SpriteKind.create()
    export const Base = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Base, function (sprite, otherSprite) {
    if (sprite.vx < 0) {
        sprite.left = 0
        sprite.vx = 0
        sprite.setKind(SpriteKind.Block)
        spawnNewBlock()
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Block, function (sprite, otherSprite) {
    if (sprite.vx < 0) {
        blockOffset = sprite.left % 4
        sprite.left += 4 - blockOffset
        sprite.vx = 0
        sprite.setKind(SpriteKind.Block)
        spawnNewBlock()
    }
})
function setupBlocks () {
    blocks = [
    assets.image`block_step_right_rot`,
    assets.image`block_step_right`,
    assets.image`block_step_right_rot`,
    assets.image`block_step_right`,
    assets.image`block_step_left_rot`,
    assets.image`block_step_left`,
    assets.image`block_step_left_rot`,
    assets.image`block_step_left`,
    assets.image`block_l_right_rot1`,
    assets.image`block_l_right_rot2`,
    assets.image`block_l_right_rot3`,
    assets.image`block_l_right`,
    assets.image`block_l_left_rot1`,
    assets.image`block_l_left_rot2`,
    assets.image`block_l_left_rot3`,
    assets.image`block_l_left`,
    assets.image`block_tetris_rot`,
    assets.image`block_tetris`,
    assets.image`block_tetris_rot`,
    assets.image`block_tetris`,
    assets.image`block_square`,
    assets.image`block_square`,
    assets.image`block_square`,
    assets.image`block_square`,
    assets.image`block_t`,
    assets.image`block_t_rot1`,
    assets.image`block_t_rot2`,
    assets.image`block_t_rot3`
    ]
}
function spawnNewBlock () {
    currentBlockRotation = 0
    currentBlockIndex = randint(0, 6) * 4
    currentBlock = sprites.create(blocks[currentBlockIndex], SpriteKind.Player)
    if (currentBlockIndex == 0 || currentBlockIndex == 4 || (currentBlockIndex == 16 || currentBlockIndex == 24)) {
        currentBlock.setPosition(160, 48)
    } else {
        currentBlock.setPosition(160, 50)
    }
    currentBlock.vx = dropSpeed
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    currentBlockRotation += 1
    currentBlockRotation = currentBlockRotation % 4
    currentBlock.setImage(blocks[currentBlockIndex + currentBlockRotation])
    if (currentBlock.bottom >= 90) {
        currentBlock.bottom = 90
    }
})
controller.down.onEvent(ControllerButtonEvent.Released, function () {
    currentBlock.vx = dropSpeed
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    if (currentBlock.bottom < 90) {
        currentBlock.y += 4
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentBlock.top > 10) {
        currentBlock.y += -4
    }
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (currentBlock.bottom < 90) {
        currentBlock.y += 4
    }
})
controller.down.onEvent(ControllerButtonEvent.Repeated, function () {
    currentBlock.vx = -50
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    game.showLongText("Game Paused", DialogLayout.Center)
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    if (currentBlock.top > 10) {
        currentBlock.y += -4
    }
})
let currentBlock: Sprite = null
let currentBlockIndex = 0
let currentBlockRotation = 0
let blocks: Image[] = []
let blockOffset = 0
let dropSpeed = 0
scene.setBackgroundColor(1)
scene.setBackgroundImage(assets.image`game_frame`)
let gameBase = sprites.create(assets.image`base`, SpriteKind.Base)
gameBase.setPosition(0, 50)
let linesCleared = 0
dropSpeed = -10
let isSpawning = 0
setupBlocks()
game.setDialogFrame(assets.image`dialog_border`)
game.showLongText("Please rotate display into portrait orientation", DialogLayout.Full)
spawnNewBlock()
