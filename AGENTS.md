# 🤖 OpenCode Agents & Design System

This document serves as the central reference for OpenCode agents, commands, configuration management, and design system guidelines for the christiant.io project.

## 🎨 Color Palette

| Color Name | Hex Code | Usage |
| :--- | :--- | :--- |
| **Dark Roast Black** | `#000000` | Hero Card Backgrounds, Professional/Premium Elements |
| **Brand Yellow** | `#fcc624` | Accents, Underlines, Primary Buttons, Hover States |
| **Text Gray** | `#333333` | Primary Text, Headers |
| **Muted Gray** | `#e0e0e0` | Subtitles on Dark Backgrounds |
| **Link Blue** | `#007bff` | Standard Links |

### Highlight Colors (for Cards)
- **Pink:** `#d63384` (Agentic Security)
- **Orange:** `#fd7e14` (GenAI Inference)
- **Cyan:** `#0dcaf0` (Secure Local Models)
- **Purple:** `#6610f2` (Malware/Evasion)
- **Green:** `#28a745` (Community)
- **Red:** `#dc3545` (Events)

---

## 🧩 Components

### 1. Hero Card
Used for premium call-to-actions or primary feature highlights.

**CSS:**
```css
.hero-card {
  background: #000000;
  color: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.25);
  margin-bottom: 40px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  transition: transform 0.2s, box-shadow 0.2s;
  border: 1px solid #1a1a1a;
}
.hero-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
  border-color: #fcc624;
}
/* ... refer to index.markdown for full inner element styles */
```

**HTML:**
```html
<div class="hero-card">
  <div class="hero-text">
    <h2>☕ Title Here</h2>
    <p>Description text here.</p>
  </div>
  <a href="#" class="hero-btn">Call to Action &rarr;</a>
</div>
```

---

### 2. Resource Grid & Cards
The standard layout for displaying lists of resources or topics.

**CSS:**
```css
.resource-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.resource-card {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border: 1px solid #e9ecef;
  transition: transform 0.2s, box-shadow 0.2s;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.resource-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  border-color: #fcc624;
}
/* Span full width utility */
.span-full {
  grid-column: 1 / -1;
}
```

**HTML:**
```html
<div class="resource-grid">
  <div class="resource-card">
    <!-- Inline style defines the theme color for this specific card -->
    <h3 style="color: #fcc624; border-bottom-color: #fcc624;">🛡️ Title</h3>
    <p>Content description.</p>
    
    <!-- Optional Pills -->
    <div class="pill-container">
       <a href="#" class="pill-link" style="--theme-color: #fcc624;">Link</a>
    </div>
  </div>
</div>
```

---

### 3. Pill Buttons
Used for tags, sub-links within cards, or footer navigation.

**CSS:**
```css
.pill-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: auto;
}
.pill-link {
  display: inline-block;
  padding: 6px 14px;
  border-radius: 50px;
  text-decoration: none !important;
  font-size: 0.85rem;
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid var(--theme-color, #007bff);
  color: var(--theme-color, #007bff) !important;
  background: white;
}
.pill-link:hover {
  background-color: var(--theme-color, #007bff);
  color: white !important;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
}
```

**HTML:**
```html
<div class="pill-container">
  <!-- Use CSS Variable --theme-color to set the specific color -->
  <a href="#" class="pill-link" style="--theme-color: #d63384;">Pink Link</a>
  <a href="#" class="pill-link" style="--theme-color: #28a745;">Green Link</a>
</div>
```

---

## 👥 Available Agents

### Primary Agents
*Primary agents are accessible via Tab key switching*

#### 🛠️ General Agent
- **Location:** `~/.config/opencode/agent/github.md`
- **Color:** Brand Yellow (`#fcc624`)
- **Purpose:** General-purpose development and repository management
- **Tools:** GitHub operations, file management, bash commands
- **Use Case:** Code reviews, repository management, git operations

#### ✍️ Writer Agent  
- **Location:** `.opencode/agent/writer.md`
- **Color:** Text Gray (`#333333`)
- **Purpose:** Technical writing and documentation improvement
- **Tools:** Write, edit, web research
- **Use Case:** Content creation, documentation updates, research

---

## ⚡ Available Commands

### Security Commands
*Project-specific commands in `.opencode/command/` directory*

#### 🔍 ARMIS Query
- **Location:** `.opencode/command/armis-query.md`
- **Color:** Security Pink (`#d63384`)
- **Purpose:** ARMIS security platform queries
- **Use Case:** Device security investigations

#### 🔍 Device Search
- **Location:** `~/.config/opencode/command/search-device.md`
- **Color:** Cyan (`#0dcaf0`)
- **Purpose:** Cross-platform device searching
- **Use Case:** Device discovery and investigation

---

## 🔧 Configuration Management

### Git Configuration
Use this git command to manage OpenCode config alongside dotfiles:

```bash
/usr/bin/git --git-dir=$HOME/.dotfiles/ --work-tree=$HOME
```

### Configuration Files
- `~/.config/opencode/opencode.json` - Main configuration
- `~/.config/opencode/config.json.armis` - ARMIS-specific security config
- `~/.config/opencode/tools.json` - Tool permissions and settings

### Project-Specific Configuration
- `.opencode/agent/` - Project-local agents
- `.opencode/command/` - Project-local commands

---

## 🛡️ Security Agents (GitHub)

Located in `/github/agents/` directory:

- **`armis-query-agent.md`** - ARMIS security query specialist
- **`soc-analyst.md`** - Security operations center analyst  
- **`sonny-soc-analyst.md.backup-*`** - Backup SOC analyst configurations

---

## 🎯 Usage Guidelines

### Agent Selection
- **General Development:** Use General Agent
- **Documentation Tasks:** Use Writer Agent
- **Security Operations:** Use GitHub security agents
- **ARMIS Queries:** Use ARMIS command

### Best Practices
1. **Color Coding:** Use assigned colors for consistent UI experience
2. **Tool Permissions:** Respect tool access levels defined in configurations
3. **Context Management:** Maintain project-specific configurations in `.opencode/`
4. **Security Considerations:** Never commit sensitive configuration data

### Agent Development
When creating new agents:
1. Follow the established color theme system
2. Use clear, descriptive names aligned with project domains
3. Define appropriate tool permissions
4. Include comprehensive documentation
5. Test with relevant use cases

---

## 🔄 Maintenance

### Regular Tasks
- Backup configurations before changes
- Test new configurations in safe environments  
- Sync dotfiles using the designated git command
- Review and update agent descriptions as needed

### Troubleshooting
- Check tool permissions in configuration files
- Verify agent locations and accessibility
- Ensure color theme consistency across agents
- Test command functionality after updates

---

*This document follows the christiant.io design system and should be updated when agents or configurations change.*
