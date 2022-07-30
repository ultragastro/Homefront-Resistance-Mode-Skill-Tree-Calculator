class Skill { // eslint-disable-line no-unused-vars
  constructor (newName, newDescription, newEffect, newCategory, newTier) {
    this.name = newName
    this.description = newDescription
    this.effect = newEffect
    this.category = newCategory
    this.tier = newTier
  }
}

class Background { // eslint-disable-line no-unused-vars
  constructor (newName, newDescription, newCategory, newBackgroundName, newBackgroundDescription, newBackgroundEffect) {
    this.name = newName
    this.description = newDescription
    this.category = newCategory
    this.backgroundName = newBackgroundName
    this.backgroundDescription = newBackgroundDescription
    this.backgroundEffect = newBackgroundEffect
  }
}

class Character { // eslint-disable-line no-unused-vars
  constructor () {
    this.allSkills = []
    this.allBackgrounds = []
    this.currentBackground = []
    this.currentSkills = []
    this.currentSkillPoints = 0
  }

  addSkill (newName, newDescription, newEffect, newCategory, newTier) {
    newName = newName.trim()
    newDescription = newDescription.trim()
    newEffect = newEffect.trim()
    newCategory = newCategory.trim()

    if (!Number.isInteger(newTier)) {
      return
    }

    const newSkill = new Skill(newName, newDescription, newEffect, newCategory, newTier)
    this.allSkills.push(newSkill)
  }

  addBackground (newName, newDescription, newCategory, newBackgroundName, newBackgroundDescription, newBackgroundEffect) {
    newName = newName.trim()
    newDescription = newDescription.trim()
    newCategory = newCategory.trim()
    newBackgroundName = newBackgroundName.trim()
    newBackgroundDescription = newBackgroundDescription.trim()
    newBackgroundEffect = newBackgroundEffect.trim()

    // newCategory is omitted, from a undefined check as it is allowed to be undefined, in future so may the newBackgroundEffect
    if (!newName || !newDescription || !newBackgroundName || !newBackgroundDescription) {
      return
    }

    const newBackground = new Background(newName, newDescription, newCategory, newBackgroundName, newBackgroundDescription, newBackgroundEffect)
    this.allBackgrounds.push(newBackground)
  }

  openSkill (event, skillName) { // eslint-disable-line no-unused-vars
    let i
    const tabContent = document.getElementsByClassName('tabContent')
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = 'none'
    }
    const tabLinks = document.getElementsByClassName('tabLink')
    for (i = 0; i < tabLinks.length; i++) {
      tabLinks[i].className = tabLinks[i].className.replace(' active', '')
    }
    document.getElementById(skillName).style.display = 'block'
    event.currentTarget.className += ' active'
  }

  openWindow (event, windowName) { // eslint-disable-line no-unused-vars
    // If no tab is open - open Brains tab of Skill Tree
    if (windowName === 'skills' && document.getElementsByClassName("tab")[0].getElementsByClassName("active").length === 0) {
      document.getElementsByClassName('tabLink')[0].click()
    }

    let i
    const windowContent = document.getElementsByClassName('windowContent')[0].children
    for (i = 0; i < windowContent.length; i++) {
      if (windowContent[i].localName !== 'aside') {
          windowContent[i].style.display = 'none'
      }
    }
    const windowLinks = document.getElementsByClassName('windowLink')
    for (i = 0; i < windowLinks.length; i++) {
      windowLinks[i].className = windowLinks[i].className.replace(' active', '')
    }
    document.getElementById(windowName).style -= 'display: none;'
    event.currentTarget.className += ' active'
  }

  previewSkill (targetName) { // eslint-disable-line no-unused-vars
    const targetEntry = this.allSkills.find(skill => skill.name === targetName)
    document.getElementById('previewBackground').style.display = 'none'
    document.getElementById('previewSkill').style.display = 'block'
    document.getElementById('previewSkillName').textContent = targetEntry.name.replace(/_/g, ' ')
    document.getElementById('previewSkillImage').src = `icons/${targetEntry.category}/${targetEntry.name}.png`
    document.getElementById('previewSkillDescription').textContent = targetEntry.description
    document.getElementById('previewSkillEffect').innerHTML = targetEntry.effect.replace(/,/g, '<br>')
  }

  previewBackground (targetName) { // eslint-disable-line no-unused-vars
    const targetEntry = this.allBackgrounds.find(background => background.name === targetName)
    document.getElementById('previewSkill').style.display = 'none'
    document.getElementById('previewBackground').style.display = 'block'
    document.getElementById('previewBackgroundName').textContent = targetEntry.name
    document.getElementById('previewBackgroundDescription').textContent = targetEntry.description
    document.getElementById('previewBackgroundBackgroundName').textContent = targetEntry.backgroundName
    document.getElementById('previewBackgroundImage').src = `icons/backgrounds/${targetEntry.name.toLowerCase().replace(/ /g, '_').replace(/-/g, '')}.png`
    document.getElementById('previewBackgroundCategory').textContent = targetEntry.category
    document.getElementById('previewBackgroundBackgroundDescription').textContent = targetEntry.backgroundDescription
    document.getElementById('previewBackgroundBackgroundEffect').innerHTML = targetEntry.backgroundEffect.replace(/,/g, '<br>')
  }

  assignSkill (targetName) { // eslint-disable-line no-unused-vars
    const targetEntry = character.allSkills.find(skill => skill.name === targetName)
    const criteriaT4 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 9 : 10
    const criteriaT3 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 5 : 6
    const criteriaT2 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 1 : 2

    // If targetEntry already in character.currentSkills remove it, otherwise assign and add it.
    if (targetEntry === character.currentSkills.find((skill) => skill.name === targetName)) {
      document.getElementById(targetName).className = ''
      character.currentSkills.splice(character.currentSkills.findIndex(skill => skill.name === targetName), 1)

      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2 || skill.tier === 3).reduce((acc, curr) => acc + curr.tier, 0) < criteriaT4) {
        const targetSkills = character.currentSkills.filter(skill => skill.category === targetEntry.category && skill.tier === 4)
        targetSkills.filter(skill => skill.tier === 4).forEach(function (skill) {
          document.getElementById(skill.name).className = ''
        })
        targetSkills.forEach(function () {
          character.currentSkills.splice(character.currentSkills.findIndex(skill => skill.name === character.currentSkills.name), 1)
        })
      }
      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2).reduce((acc, curr) => acc + curr.tier, 0) < criteriaT3) {
        const targetSkills = character.currentSkills.filter(skill => skill.category === targetEntry.category && (skill.tier === 3 || skill.tier === 4))
        targetSkills.filter(skill => skill.tier === 3 || skill.tier === 4).forEach(function (skill) {
          document.getElementById(skill.name).className = ''
        })
        targetSkills.forEach(function () {
          character.currentSkills.splice(character.currentSkills.findIndex(skill => skill.name === character.currentSkills.name), 1)
        })
      }
      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1).reduce((acc, curr) => acc + curr.tier, 0) < criteriaT2) {
        const targetSkills = character.currentSkills.filter(skill => skill.category === targetEntry.category && (skill.tier === 2))
        targetSkills.filter(skill => skill.tier === 2).forEach(function (skill) {
          document.getElementById(skill.name).className = ''
        })
        targetSkills.forEach(function () {
          character.currentSkills.splice(character.currentSkills.findIndex(skill => skill.name === character.currentSkills.name), 1)
        })
      }
    } else {
      // If total where targetEntry.tier is 4 and total tier where tier is either 1, 2 or 3
      if (targetEntry.tier === 4 &&
      character.currentSkillPoints <= 16 &&
      character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2 || skill.tier === 3).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT4) {
        document.getElementById(targetName).className = 'assigned'
        character.currentSkills.push(targetEntry)
      }
      if (targetEntry.tier === 3 &&
      character.currentSkillPoints <= 17 &&
      character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT3) {
        document.getElementById(targetName).className = 'assigned'
        character.currentSkills.push(targetEntry)
      }
      if (targetEntry.tier === 2 &&
      character.currentSkillPoints <= 18 &&
      character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT2) {
        document.getElementById(targetName).className = 'assigned'
        character.currentSkills.push(targetEntry)
      }
      if (targetEntry.tier === 1 &&
      character.currentSkillPoints <= 19) {
        document.getElementById(targetName).className = 'assigned'
        character.currentSkills.push(targetEntry)
      }
    }
    // If total character.currentSkills with targetEntry.category and skill.tier 1 is equal to or greater than 2 remove grey background, else add grey background
    const categoryHeading2 = document.getElementById(`${targetEntry.category}2`).getElementsByTagName('h3')[0]
    const categoryContent2 = document.getElementById(`${targetEntry.category}2`).getElementsByTagName('div')[0]
    if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT2) {
      categoryHeading2.className = 'heading unlocked'
      categoryContent2.style.backgroundColor = 'inherit'
    } else {
      categoryHeading2.className = 'heading locked'
      categoryContent2.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
    }
    const categoryHeading3 = document.getElementById(`${targetEntry.category}3`).getElementsByTagName('h3')[0]
    const categoryContent3 = document.getElementById(`${targetEntry.category}3`).getElementsByTagName('div')[0]
    if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT3) {
      categoryHeading3.className = 'heading unlocked'
      categoryContent3.style.backgroundColor = 'inherit'
    } else {
      categoryHeading3.className = 'heading locked'
      categoryContent3.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
    }
    const categoryHeading4 = document.getElementById(`${targetEntry.category}4`).getElementsByTagName('h3')[0]
    const categoryContent4 = document.getElementById(`${targetEntry.category}4`).getElementsByTagName('div')[0]
    if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2 || skill.tier === 3).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT4) {
      categoryHeading4.className = 'heading unlocked'
      categoryContent4.style.backgroundColor = 'inherit'
    } else {
      categoryHeading4.className = 'heading locked'
      categoryContent4.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
    }
    character.updateCharacter()
  }

  assignBackground (targetName) {
    const categories = [...new Set(character.allSkills.map(skill => skill.category))]
    const targetEntry = character.allBackgrounds.find(background => background.name === targetName)
    character.currentBackground = character.allBackgrounds.find(background => background.name === targetName)
    const criteriaT4 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 9 : 10
    const criteriaT3 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 5 : 6
    const criteriaT2 = (character.currentBackground.category === targetEntry.category || character.currentBackground.name === 'Videogame Developer') ? 1 : 2

    console.log(targetEntry, criteriaT4, criteriaT3, criteriaT2)

    // If background class entries not null, remove all background entries.
    if (document.getElementsByClassName('background') !== null) {
      [...document.getElementsByClassName('background')].map(background => background && background.remove())
    }
    // For each background...
    character.allBackgrounds.forEach(function (test) {
      // If background equal to character's current background set colour to red, otherwise none (which means white is inherited from css).

      if (test.name === character.currentBackground.name) {
        document.getElementById(test.name).style.color = 'rgb(180, 24, 7)'
        // Current background category equal to null, ie all, for each category add background image, otherwise add singular background image.
        if (character.currentBackground.category === '') {
          categories.forEach(function (category) {
            const location = document.getElementById(`${category}1`).getElementsByClassName('content')[0]
            const img = document.createElement('img')
            img.id = test.name.toLowerCase()
            img.classList.add('background')
            img.src = `icons/backgrounds/${test.name.toLowerCase().replace(/ /g, '_').replace(/-/g, '')}.png`
            img.style.filter = 'opacity(1)'
            img.addEventListener('click', function(){character.previewBackground(targetName)}, false)
            location.insertBefore(img, location.firstChild)
          })
        } else {
          const location = document.getElementById(`${test.category}1`).getElementsByClassName('content')[0]
          const img = document.createElement('img')
          img.id = test.name.toLowerCase()
          img.classList.add('background')
          img.src = `icons/backgrounds/${test.name.toLowerCase().replace(/ /g, '_').replace(/-/g, '')}.png`
          img.style.filter = 'opacity(1)'
          img.addEventListener('click', function(){character.previewBackground(targetName)}, false)
          location.insertBefore(img, location.firstChild)
        }
      } else {
        document.getElementById(test.name).style.color = ''
      }
    })
    // 
    console.log(character.currentBackground.category)
    if (character.currentBackground.category === '') {
      console.log("1")
      categories.forEach(function (category) {
        console.log(category)
        const categoryHeading2 = document.getElementById(`${category}2`).getElementsByTagName('h3')[0]
        const categoryContent2 = document.getElementById(`${category}2`).getElementsByTagName('div')[0]
        if (character.currentSkills.filter(skill => skill.category === category).filter(skill => skill.tier === 1).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT2) {
          categoryHeading2.className = 'heading unlocked'
          categoryContent2.style.backgroundColor = 'inherit'
        } else {
          categoryHeading2.className = 'heading locked'
          categoryContent2.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
        }
        const categoryHeading3 = document.getElementById(`${category}3`).getElementsByTagName('h3')[0]
        const categoryContent3 = document.getElementById(`${category}3`).getElementsByTagName('div')[0]
        if (character.currentSkills.filter(skill => skill.category === category).filter(skill => skill.tier === 1 || skill.tier === 2).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT3) {
          categoryHeading3.className = 'heading unlocked'
          categoryContent3.style.backgroundColor = 'inherit'
        } else {
          categoryHeading3.className = 'heading locked'
          categoryContent3.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
        }
        const categoryHeading4 = document.getElementById(`${category}4`).getElementsByTagName('h3')[0]
        const categoryContent4 = document.getElementById(`${category}4`).getElementsByTagName('div')[0]
        if (character.currentSkills.filter(skill => skill.category === category).filter(skill => skill.tier === 1 || skill.tier === 2 || skill.tier === 3).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT4) {
          categoryHeading4.className = 'heading unlocked'
          categoryContent4.style.backgroundColor = 'inherit'
        } else {
          categoryHeading4.className = 'heading locked'
          categoryContent4.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
        }
      })
    } else {
      console.log("2")
      const categoryHeading2 = document.getElementById(`${targetEntry.category}2`).getElementsByTagName('h3')[0]
      const categoryContent2 = document.getElementById(`${targetEntry.category}2`).getElementsByTagName('div')[0]
      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT2) {
        categoryHeading2.className = 'heading unlocked'
        categoryContent2.style.backgroundColor = 'inherit'
      } else {
        categoryHeading2.className = 'heading locked'
        categoryContent2.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
      }
      const categoryHeading3 = document.getElementById(`${targetEntry.category}3`).getElementsByTagName('h3')[0]
      const categoryContent3 = document.getElementById(`${targetEntry.category}3`).getElementsByTagName('div')[0]
      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT3) {
        categoryHeading3.className = 'heading unlocked'
        categoryContent3.style.backgroundColor = 'inherit'
      } else {
        categoryHeading3.className = 'heading locked'
        categoryContent3.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
      }
      const categoryHeading4 = document.getElementById(`${targetEntry.category}4`).getElementsByTagName('h3')[0]
      const categoryContent4 = document.getElementById(`${targetEntry.category}4`).getElementsByTagName('div')[0]
      if (character.currentSkills.filter(skill => skill.category === targetEntry.category).filter(skill => skill.tier === 1 || skill.tier === 2 || skill.tier === 3).reduce((acc, curr) => acc + curr.tier, 0) >= criteriaT4) {
        categoryHeading4.className = 'heading unlocked'
        categoryContent4.style.backgroundColor = 'inherit'
      } else {
        categoryHeading4.className = 'heading locked'
        categoryContent4.style.backgroundColor = 'rgba(79, 79, 79, 0.5)'
      }
    }
    character.updateCharacter()
  }
  updateCharacter () {
    // Calculating currentSkillPoints - equals total of all skill tiers, plus 1 unless currentBackground is blank or Student
    character.currentSkillPoints = (character.currentSkills.reduce((acc, curr) => acc + curr.tier, 0)) + ((character.currentBackground.length === 0 || character.currentBackground.name === 'Student') ? 0 : 1)

    // delete summary table - if table exists
    if (document.querySelector('table') !== null) {
      document.querySelector('table').remove()
    }

    // summary table declaration
    const table = document.createElement('table')
    const row = document.createElement('tr')
    const backgroundName = document.createElement('td')
    const backgroundEffect = document.createElement('td')

    // add background to table
    backgroundName.appendChild(document.createTextNode((character.currentBackground.length === 0) ? 'No Background Selected'.toUpperCase() : character.currentBackground.name.toUpperCase().replace(/_/g, ' ')))
    backgroundEffect.appendChild(document.createTextNode(
      (character.currentBackground.length === 0) ? '' : ((character.currentBackground.backgroundEffect === '') ? character.currentBackground.backgroundDescription : character.currentBackground.backgroundEffect)
    ))
    row.appendChild(backgroundName)
    row.appendChild(backgroundEffect)
    table.appendChild(row)

    // add skills to table
    character.currentSkills.forEach(skill => {
      const row = document.createElement('tr')
      const skillName = document.createElement('td')
      const skillEffect = document.createElement('td')
      skillName.appendChild(document.createTextNode(skill.name.toUpperCase().replace(/_/g, ' ')))
      skillEffect.appendChild(document.createTextNode((skill.effect === '') ? skill.description : skill.effect))
      row.appendChild(skillName)
      row.appendChild(skillEffect)
      table.appendChild(row)
    })

    // add table to summary section
    document.querySelector('#summary').appendChild(table)

    // delete totals section
    const headings = [...document.getElementById('totals').getElementsByTagName('h1')]
    const content = [...document.getElementById('totals').getElementsByTagName('p')]
    headings.forEach((value, index) => { headings[index].remove() })
    content.forEach((value, index) => { content[index].remove() })

    // create 
    // document.getElementById('totals')
    
    const heading = document.createElement('h1')
    heading.appendChild(document.createTextNode('Progression'))
    document.querySelector('#totals').appendChild(heading)
    
    const total = document.createElement('p')
    total.appendChild(document.createTextNode(`Assigned Skill Points: ${character.currentSkillPoints}/20`))
    document.querySelector('#totals').appendChild(total)
  }
}

const character = new Character() // eslint-disable-line no-unused-vars

// (method) Character.addSkill(newName: any, newDescription: any, newEffect: any, newCategory: any, newTier: any): void
character.addSkill('armorer', 'Improve the time it takes to modify your weapons and build GTK items.', '+20% Weapon Customization Speed, +66% GTK Item Craft Speed', 'brains', 1)
character.addSkill('technophile', 'Construct your own hack GTK devices on the fly from parts scavenged during a mission.', '', 'brains', 1)
character.addSkill('misdirection', 'Your distraction GTK works for longer and at a greater range from enemies.', '+75% Distraction Radius, +100% Distraction Duration', 'brains', 1)
character.addSkill('single_minded', 'Increased objective interaction speed.', '+20% Objective Interaction Speed', 'brains', 1)
character.addSkill('lifesaver', 'Revive team members faster.', '+20% Revive Speed', 'brains', 1)
character.addSkill('tactical_awareness', 'Tagged enemies show icons of their unit type (shared with team).', '', 'brains', 2)
character.addSkill('hacker', 'The hack GTK you deploy will control target drones for longer.', '+50% Hack Duration', 'brains', 2)
character.addSkill('healing_hands', 'Receive more health when being revived and provide more health when reviving others.', '+40% Health on revive, +40% Health to others on revive', 'brains', 2)
character.addSkill('ingenious', 'Your advanced crafting skills means that sometimes you can make two items for the cost of one.', '+25% Additional GTK Item Craft Chance', 'brains', 3)
character.addSkill('flammable', 'Your incendiary GTK items are more effective.', '+50% Burn Damage', 'brains', 3)
character.addSkill('demolitions_training', 'Your explosive GTK items are more effective', '+33% Infantry Damage, +33% Vehicle Damage', 'brains', 3)
character.addSkill('paramedic', 'Active skill which allows you to deploy a shared package that provides players with medical supplies when they interact with it. Skill can be activated once per mission.', '', 'brains', 4)
character.addSkill('parkour', 'Walls? What walls? You can climb much quicker.', '+50% Climbing Speed', 'brawn', 1)
character.addSkill('power_slide', 'You move much quicker when crouched.', '+50% Crouch Movement Speed, +50% Slide Distance, +30% Slide Deceleration Reduction', 'brawn', 1)
character.addSkill('tuck_&_roll', 'Take less damage when falling.', '+33% Fall Damage Reduction', 'brawn', 1)
character.addSkill('tough', 'Gain a small amount of additional health.', '+10% Max Health', 'brawn', 1)
character.addSkill('knife_fighter', 'Increases melee takedown speed.', '+25% Takedown Speed', 'brawn', 1)
character.addSkill('endurance', 'Sprint at full speed for longer.', '+70% Sprint Dash Duration', 'brawn', 1)
character.addSkill('tooled_up', 'Carry more GTK ammo', '+1 GTK ammo for all types.', 'brawn', 2)
character.addSkill('prepared_for_the_worst', 'Carry more health packs.', '+2 Health Packs', 'brawn', 2)
character.addSkill('grizzled', 'Gain a moderate amount of additonal health.', '+15% Max Health', 'brawn', 2)
character.addSkill('unburdened', "You've worked on your strength and endurance. Heavy gear has less of an impact on your movement.", '+50% Encumbrance Effect Reduction', 'brawn', 2)
character.addSkill('heavy_takedown', 'Takedown Heavy soldiers in hand-to-hand combat.', '', 'brawn', 3)
character.addSkill('badass', 'Gain a large amount of additional health.', '+25% Max Health', 'brawn', 3)
character.addSkill('fleet_footed', 'Get around faster.', '+25% Crouch Movement Speed, +25% Walk Movement Speed, +20% Sprint Movement Speed, +5% Sprint Dash Speed', 'brawn', 3)
character.addSkill('adrenaline_boost', 'Active skill which allows you to deploy a shared package that temporarily boosts movement speed and damage resistance for players when they interact with it. Skill can be activated once per mission.', '+33% Global Damage Reduction, +33% Crouch Movement Speed, +33% Walk Movement Speed, +33% Sprint Movement Speed, +10% Sprint Dash Movement Speed', 'brawn', 4)
character.addSkill('firestarter', 'Construct your own incendiary GTK devices on the fly from parts scavenged during a mission.', '', 'fighter', 1)
character.addSkill('spotter', 'Automatically tag targets whilst aiming through a sniper scope.', '', 'fighter', 1)
character.addSkill('quick_draw', 'Draw and change weapons swiftly.', '+70% Weapon Select Speed', 'fighter', 1)
character.addSkill('spatial_awareness', 'A sense of your surroundings allows you to move speedily when staring down your sights.', '+20% ADS (Aim Down Sights) Movement Speed', 'fighter', 1)
character.addSkill('deadeye', 'A relaxed grip and improved breathing makes for a steadier aim', '+33% Stability', 'fighter', 1)
character.addSkill('marksman', 'Can hold breath for longer when zoomed', '+100% Zoom Stabilization Duration', 'fighter', 2)
character.addSkill('speed_loading', 'Faster reload time with all weapons.', '+25% Reload Speed', 'fighter', 2)
character.addSkill('steady_aim', 'Recoil has less of an effect when aiming', '+15% ADS Recoil Reduction', 'fighter', 2)
character.addSkill('snapshot', 'Improved muscle-memory allows you to swiftly move your weapon from hip to aim.', '+50% ADS Speed', 'fighter', 2)
character.addSkill('gunner', 'Equip an additional weapon.', '', 'fighter', 3)
character.addSkill('bullet_mule', 'Carry more ammo for all your weapons.', '+15 Pistol ammo, +32 SMG ammo, +5 Pneumatic ammo, +30 Assault Rifle ammo, +50 LMG ammo, +3 Limpet Mine ammo, +16 Shotgun ammo, +6 Inferno Launcher ammo, +32 Auto Shotgun ammo, +30 Battle Rifle ammo, +6 Sniper Rifle ammo, +10 Freedom Launcher ammo, +6 Crossbow ammo, +6 Blunderbuss ammo, +100 Flamethrower ammo, +1 RPG ammo', 'fighter', 3)
character.addSkill('auto_spotting', 'Automatically tag targets whilst aiming down iron sights.', '', 'fighter', 3)
character.addSkill('munitions', 'Active skill which allows you to deploy a shared package that provides players with ammo supplies when they interact with it. Skill can be activated once per mission.', '', 'fighter', 4)
character.addSkill('camouflage', "Enemies are less likely to spot you when you're not moving.", '+40% Stationary Detection Multiplier', 'survivor', 1)
character.addSkill('ghost', 'Silent and stealthy movement ensures that enemies quickly lose sight of you.', '+100% AI Perception Decay Rate', 'survivor', 1)
character.addSkill('illusionist', 'Construct your own distraction GTK devices on the fly from parts scavenged during a mission.', '', 'survivor', 1)
character.addSkill('fast_aid', 'Healing yourself takes less time.', '+50% Heal Speed', 'survivor', 1)
character.addSkill('forager', "Scavenging is what you're good at and you can do it much faster than other folks.", '+20% Scavenge Speed', 'survivor', 1)
character.addSkill('strong_will', "It doesn't take much to get you back on your feet. Get revived faster.", '+20% Self Revive Speed', 'survivor', 1)
character.addSkill('resilience', 'Greatly increases time taken to bleed out when incapicated.', '+35% Bleed Out Time', 'survivor', 2)
character.addSkill('light_footed', 'Your footfalls make barely any noise, making it tougher for enemies to notice your passing.', '+50% Footstep Reduction', 'survivor', 2)
character.addSkill('concealment', "You're hard to spot, allowing you to sneak in closer to enemies.", '+20% Moving Detection Multiplier, +20% Stationary Detection Multiplier, +30% Passive Footstep Reduction', 'survivor', 2)
character.addSkill('scavenger', 'Find more stuff when scavenging.', '+100% Looted Ammo, +100% Looted GTK Materials', 'survivor', 2)
character.addSkill('combat_awareness', 'A team-wide boost to the length of time enemies are shown on the mini-map. Stacks with other team mates if they have this skill.', '+50% Mark Duration', 'survivor', 2)
character.addSkill('glutton_for_punishment', 'Can be revived more times in a mission.', '+2 Revives', 'survivor', 3)
character.addSkill('pickpocket', 'Automatically loot an enemy during a take-down', '', 'survivor', 3)
character.addSkill('autoinjector', 'Can revive yourself whilst incapacitated once per mission.', '', 'survivor', 3)
character.addSkill('resourceful', 'Active skill which allows you to deploy a shared package that provides players with crafting materials when they interact with it. Skill can be activated once per mission.', '', 'survivor', 4)

// (newName: any, newDescription: any, newCategory: any, newBackgroundName: any, newBackgroundDescription: any, newBackgroundEffect: any): void
character.addBackground('Cosplayer', "It's not just dressing up, it's about attitude, carrying yourself like you mean business; harnessing your inner hero.", 'brains', 'reiya', 'Reduces gear rank restrictions by 1 rank.', '')
character.addBackground('Timesplitter', 'Somewhere out there is a crystal hidden in this bleak, miserable time-zone.', 'brains', 'from the future', 'Your hack devices last longer.', '+25% Hack Duration')
character.addBackground('Student', 'So you got no experience in fighting, no useful skills, no contacts, nothing to offer but a willingness to learn and a desire to make the KPA pay.', '', 'blank canvas', 'No starting skill, thus an extra skill point to spend elsewhere in the skill tree however you like.', '')
character.addBackground('Gamer', "With a K/D ratio and trask talk that can reduce the most hardened opponents to tears, it's time to pwn these KPA noobs...", 'fighter', 'aimbot', 'Small reduction to recoil when firing from the hip.', '10% Hipfire Recoil Reduction')
character.addBackground('Prepper', "You always knew somethign bad was going to happen. You've been getting ready for this for years. Now who's laughing!", 'survivor', 'stockpile', "With caches of gear hidden all over Philly, you're never without the essentials. Always enter a mission with at least 1 of each GTK item, regardless of inventory.", '')
character.addBackground('Firefighter', "You've always been dedicated to protecting people. Now you realise the way to do that has changed. Time to start some fires of your own.", 'brawn', 'pre-singed', 'Years of working with fire means you know how to handle yourself around. Take reduced damage from fire.', '+40% Fire Damage Reduction')
character.addBackground('Revolutionary', "You've been fighting the KPA from the start, long before everyone woke up and realised what a threat to liberty they were. You'll keep fighting to your last breath to see the US free again.", 'survivor', 'patriot', 'As a son or daughter of the revolution, your deeds speak louder. Receive 5% bonus on citation rewards', '')
character.addBackground('G-Man', "As an FBI agent you used to carry the weight of the whole government on your shoulders, but now you're on your own. Good job you got the training and skills to prevail.", 'fighter', 'special agent training', 'Minor increase to weapon switch and reload speeds.', '+15% Weapon Select Speed, +5% Weapon Reload Speed')
character.addBackground('US Marshal', "Ain't no place for an old school lawman-come-man-hunter nowadays, but you sure can lend a hand to the fight against the KPA.", 'fighter', 'justified', 'Shoot first, shoot fast! Steadier aiming, faster aimed movement and quicker reload for the Pistol', '+15% Pistol Reload Speed, +20% Pistol Stability, +15% Pistol ADS Movement Speed')
character.addBackground('ATF Agent', "You learnt a thing or two about guns and combat during countless drug raids. Now it's time to take that experience and put it to good use against the KPA.", 'brains', 'gunsmith', 'Modifying weapons is quicker than normal.', '+15% Weapon Customisation Speed')
character.addBackground('Personal Trainer', "A career built out of making people sweat was doomed to end the moment the food started running out. You'll never be short of a workout in the Resistance.", 'brawn', 'no pain no gain', 'You know how to push through the pain, using it to your advantage. Move faster when on critical health.', '+20% Critical Health Movement Speed')
character.addBackground('Cab Driver', 'Navigating the city streets was a game of reflexes and intuition. Your skills behind the wheel are second to none. You know the streets of Philadelphia better than anyone else, especially the KPA.', 'brains', 'rush hour', 'Your RC Car is faster and has greater range.', '+100% RC Car Top Speed, +50% RC Car Range')
character.addBackground('Stevedore', "Four generations of your family worked on the docks, through good times and bad. Now the docks are just piles of scrap and rubble. Someone's gotta pay.", 'survivor', 'tenacious', 'Slightly increases time taken to bleed out when downed.', '+20% Bleedout Time')
character.addBackground('Laborer', "You ain't afraid of hard work, you've been grafting your entire life. When a tough job needs doing you're the person the Resistance turn to first.", 'brawn', 'just a scratch', 'Recieve extra health after being revived.', '+20% Self Revive Health')
character.addBackground('Baseball Player', "With a pitching arm like yours you were gonna go far, maybe event into the major league. But times are rough and you're better off pitching molotov coktails than hard balls.", 'brawn', 'pitching arm', 'Throw further, toss some good cheese.', '+25% Throwable GTK Throw Speed,  +50% Other GTK Throw Speed')
character.addBackground('Pharmacist', "There's barely a paracetamol to be found in Philly, let alone antibiotics, insulin or any one of a hundred drugs you took for granted. What's left for someone of your skills to do, other than to fight back?", 'brains', 'the good shit', 'You have your own special mixture in those derms. Revived allies received a temporary move speed bonus.', ' 7 seconds of:, +33% Crouch Movement Speed, +33% Sprint Movement Speed, +33% Walk Speed.')
character.addBackground('Exterminator', "Someone's gotta get rid of the vermin in this city, and there ain't no bigger rats than the KPA.", 'survivor', 'rat poison bomb', 'Few people know that rat poison is an anti-coagulant. Make them bleed... Explosive GTK items are more effective against infantry.', '+20% Explosive GTK Infantry Damage')
character.addBackground('Electrician', "Scratching a liviing by fixing up solar lighting, or turning collaborator and working on the KPA's high end surveillance gear are the only two choices left for your skills. There's gotta be a third way.", 'brains', 'haxxor', 'A few tweaks here and there means that hacked drones receive a small accuracy bonus.', '+50% Drone Accuracy Bonus')
character.addBackground('Gas Jockey', 'You never could have imagined that working in a hazardous and potentially explosive environment would have been training for fighting to free your city. Funny how things work out sometimes.', 'fighter', 'secret ingredient', 'A little bit of something puts more oomph into your concoctions. Incendiaries have a slightly larger radius.', '+20% Incendiary Burn Radius')
character.addBackground('Gangbanger', "All you used to care about was hanging with your crew and getting loaded. Now shit's got real, most of your crew got zip-tied and a bullet in the back of the head. Time for some payback.", 'survivor', 'streetwise', 'Raised on the streets of Philly, you know how to look after yourself. Skills in the Survivor category cost less XP.', '+10% Survivor Tree XP Discount')
character.addBackground('Auto Mechanic', "Now more than ever there's plenty of things that need fixing. First on the list, fix the KPA. Fix them real good.", 'brains', 'breaker', 'You could take these things apart blindfolded. Scavenge more materials from drone and vehicle wreaks.', '+1 to 2 Material from Drone/Vehicles')
character.addBackground('Plumber', 'No one cares until they turn on a faucet and nothing comes out. Broken faucets are the least folks worries nowadays.', 'fighter', 'pipe fitter', "More effective with 'Homebrew' weapon class.", '+15% Homebrew Reload Speed, +15% Homebrew Select Speed, +15% Homebrew Damage')
character.addBackground('Postal Worker', 'You used to walk the streets of Philadelphia as you did your rounds. You walked through any conditions and through any neighborhood. The KPA have yet to experience the tenacity of a Postal Worker.', 'fighter', 'angry', 'Never one to shy away from a ruckus, skills in the Fighter category cost less XP.', '+10% Fighter Tree XP Discount')
character.addBackground('Cage Fighter', "What's the point of beating the shit out of someone in a ring when there's a real fight to be had?", 'fighter', 'brawler', 'Hand-to-hand training makes you more resilient in close-quarter combat.', '+75% Melee Damage Reduction')
character.addBackground('Lawyer', "There's no law but KPA law, and no trial by a jury of your peers, unless your peers are weasel collaborators. Nothing for it but to become judge, jury and executioner", 'brains', 'brawler', 'Your natural smarts means skills in the Brains category cost less XP.', '+10% Brains Tree XP Discount')
character.addBackground('Videogame Developer', 'A lover, a fighter, an exemplary specimen of humanity. Your country needs your kind of hero. This is your time.', '', 'perfect', 'Reduces all tier unlock costs by 1.', '')
character.addBackground('Dancer', "You got the body, you got the moves, but nowadays people don't give a shit about art or performance, they're just looking to get by.", 'brawn', 'you got the moves', "You're agile and lithe, making it harder to be hit by enemy fire.", '+10% AI Accuracy Reduction')
character.addBackground('Receptionist', 'No more are you willing to take calls for some middle management collaborators. Time to help organise a Revolution!', 'survivor', 'mostly harmless', "Butter wouldn't melt in your mouth. Less likely to be targeted by an enemy.", '+100% Target Chance Reduction')
character.addBackground('Meat Packer', "Meat Packing might not be the most glamorous of jobs, but what use is glamour in a fight for survival? You're tough and you're strong and that's exactly what the Resistance need to win this.", 'fighter', "butcher's eye", 'You know where to make the best cut, increasing the distance at which you can initiate a takedown.', '+100% Takedown Range')
character.addBackground('Trauma Nurse', "You spent your entire career staring death in the face and bravely fighting to save people. At least now you don't take have to wait for them to be brought to you. Treating injuries under fire tests anyone's nerves, including yours.", 'brains', 'medical training', 'Your first aid skills increase the distance at which you can revive a teammate.', '+50% Revive Range')
character.addBackground('Personal Shopper', 'Not much use for hand-picked lingerie and boutique fashion. Not unless you want to turn collaborator. Luckily, camouflage and dirt-encrusted fatigues are the new hot thing around town this season.', 'brawn', 'you got the look', 'A sense of style has its own advantages. Each vanity item (no bonus) worn adds incremental damage reduction.', '+1% Global Damage Reduction per Vanity Item')
character.addBackground('Warehouse Picker', "Putting stuff in boxes to ship to folks who drunkenly clicked buy at 3am wasn't the most exciting job in the world, but it was a job. Now that's all gone. Time to do something about it.", 'brawn', 'burly', 'A natural athlete, skills in the Brawn category cost less XP.', '+10% Brawn Tree XP Discount')
character.addBackground('Drifter', "You were never one for possessions or staying in one place for very long, but Philadelphia is your home now and you aren't going to sit by and let the KPA ruin it. Sometimes a little purpose is all you need.", 'survivor', 'scrounger', 'Increased chance of receiving materials when looting corpses.', '+200% Material Scavenge Chance')
