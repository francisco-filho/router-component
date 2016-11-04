set number
set tabstop=2
set shiftwidth=2
set expandtab
set syntax=on

"disable scrollbars, menu and toolbar from gvim
set guioptions-=T
set guioptions-=m
set guioptions-=L
set guioptions-=r
"make Monaco the default font
" set gfn=Monaco\ for\ Powerline\ 12
set gfn=Fira\ Mono\ 14
"set gfn=Droid\ Sans\ Mono\ 12
"set gfn=Terminus\ 14

"mostra ponto no lugar de espaço
set list
set listchars=tab:▸\ ,eol:¬,trail:·
set lcs+=space:·

"VimPlug plugins enabled
call plug#begin()
Plug 'NLKNguyen/papercolor-theme'
Plug 'tpope/vim-sensible'
Plug 'tpope/vim-pathogen'
Plug 'Raimondi/delimitMate'
Plug 'airblade/vim-gitgutter'
Plug 'gregsexton/gitv'
"Plug 'digitaltoad/vim-jade'
Plug 'elzr/vim-json'
Plug 'Valloric/YouCompleteMe'
Plug 'scrooloose/syntastic'
Plug 'bling/vim-airline'
Plug 'tpope/vim-fugitive'
Plug 'scrooloose/nerdtree'
Plug 'kien/ctrlp.vim'
Plug 'pangloss/vim-javascript'
Plug 'mxw/vim-jsx'
Plug 'rking/ag.vim'
Plug 'marijnh/tern_for_vim'
Plug 'xolox/vim-misc'
Plug 'plasticboy/vim-markdown'
Plug 'flazz/vim-colorschemes'
Plug 'xolox/vim-colorscheme-switcher'
Plug 'tomtom/tcomment_vim'
"Plug 'vim-scripts/dbext.vim'
Plug 'tpope/vim-surround'
"Plug 'tfnico/vim-gradle'
Plug 'easymotion/vim-easymotion'
Plug 'morhetz/gruvbox'
Plug 'ryanoasis/vim-devicons'
Plug 'rstacruz/sparkup'
" Plug 'Yggdroot/indentLine'
Plug 'nelstrom/vim-markdown-folding'
Plug 'wavded/vim-stylus'
Plug 'brandonbloom/tslime.vim'
call plug#end()

"theme configuration
syntax enable
set background=dark
"solarized options 
let g:solarized_visibility = "high"
let g:solarized_contrast = "high"
" colorscheme hibryd
let g:hybrid_custom_term_colors = 1
let g:hybrid_reduced_contrast = 1 " Remove this line if using the default palette.
colorscheme onedark
let &t_Co=256

"show bookmarks on open
let NERDTreeShowBookmarks=1
"change vim dir when root dir is changed
let NERDTreeChDirMode=2
"open nerdtree on the right
let g:NERDTreeWinPos = "right"
map <C-n> :NERDTreeToggle<CR>

let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/]\.(git|hg|svn|node_modules)$',
  \ 'file': '\v\.(exe|so|dll)$',
  \ 'link': 'nolinkyet',
  \ }

" disable markdown automatic folding
let g:vim_markdown_folding_disabled=1

if !exists('g:airline_symbols')
      let g:airline_symbols = {}
  endif
let g:airline_symbols.space = "\ua0"
let g:airline_symbols.branch = '⭠'

"<ctrl+enter> go to new line
imap <C-CR> <C-o>$<CR>

"<ctrl+shifit+enter> go to new line and append line
imap <C-S-CR> <C-o>A;<CR>

"leader key re-map to space
let mapleader = ","

"eclim + ycm
let g:EclimCompletionMethod = 'omnifunc'

"comment lines in normal mode
nmap <leader>c <c-_><c-_>

let g:dbext_default_profile_portal = 'type=PGSQL:user=francisco:passwd=12345678:host=localhost:dbname=portal' 
let g:dbext_default_profile = 'portal'

vmap <C-c> "+yi
vmap <C-x> "+c
vmap <C-v> c<ESC>"+p
imap <C-v> <C-r><C-o>+
imap <C-cr> <C-o>$<cr>

if has("autocmd")
      filetype plugin indent on
endif

"conceal level of vim-json
let g:vim_json_syntax_concealcursor=""
let g:vim_json_syntax_conceal = 0

"ctrl+p exclude pattern
let g:ctrlp_custom_ignore = {
  \ 'dir':  '\v[\/](\.git|\.hg|\.svn|node_modules)$',
  \ 'file': '\v\.(exe|so|dll)$'
  \ }

"react (jsx)
let g:jsx_ext_required = 0
let g:syntastic_javascript_checkers = ['eslint']
"let g:syntastic_javascript_jsxhint_exec= 'jsx-jshint-wrapper'

