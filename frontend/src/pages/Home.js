import React from "react";
import Navbar from "./Home-files/Navbar";
import './Home-files/style.css'

import mockup from './Home-files/samplemockup.png'
import flower from './Home-files/flower.jpg'
import logo from '../images/logo.png'
import illustration from './Home-files/ills.jpg'


function Home() {
    document.title = 'Home | NotesApp';
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none'
    // document.getElementsByTagName('body')[0].style.backgroundColor = 'white'
    return (
        <div>
            <Navbar />
            <div id="homegrid">
                <div id="bubblecon">
                    <img src={flower} alt="" />
                </div>
                <div id="herotext">
                    <span id="sitename"><span id="homeLogo"></span>NotesApp</span>
                    <br />
                    <br />
                    <span id='podeasy'>Make notes from your favourite messaging apps.</span>
                    <div id="joinintro">Currently supports <i class="lni lni-whatsapp"></i><i class="lni lni-facebook-messenger"></i></div>
                    <br />
                    <a href="https://bit.do/notesapp" target='_blank'>
                        <div id="joinbutton" className='homepagebutton'>Join Now</div>
                    </a>
                    <a href="#homegrid2">
                        <div id="knowmorebutton" className='homepagebutton'>Know More</div>
                    </a>
                </div>
                <div id="mockupimgcon">
                    <img src={mockup} alt="" id="mockupimg" />
                </div>
            </div>

            <div id="homegrid2">
                <div className="panel" id='imgpanel'>
                    <img src={illustration} alt="" />
                    <a href='https://bit.do/notesapp' target='_blank'><div id="createaccountbutton" className='homepagebutton'>
                        <i class="lni lni-whatsapp"></i>  Open WhatsApp and Sign Up
            </div></a>

                </div>
                <div className="panel" id='textpanel'>
                    <span>
                        With <em>NotesApp</em>, you can easily make notes and save attachments right from the social apps you already use and love. <br />
                        No more fiddling around in long chats full of useless texts, just to search for the message you wanted to save.<br />
                        You can access all the notes you save on any device, right from your browser.<br />
                    </span>
                    <br />
                    <h3>How does it work?</h3>
                    <ul>
                        <li>Go to <a href="https://bit.do/notesapp" target='_blank'>this link</a> and send a message saying <b>'Join'</b> to sign up using WhatsApp.</li>
                        <li>You will be asked for a password. Reply with the password you want to set for your new account.</li>
                        <li>That's it, your NoteApp account is ready to use. You will be guided on how to link your Messenger account (optional).</li>
                        <li>Adding notes is as simple as sending text or voice notes to us.</li>
                        <li>You can also 'Bookmark' your important notes, and these notes will be available on the Bookmarks page on the webapp for easy access.</li>
                    </ul>
                </div>
            </div>
            <div id='homeFooter'>
                <span>Developed by Team ReqRes Cynics</span>
                <a href='https://github.com/heli576/note-maker-whatsapp-reqrescynics'><span>View on GitHub</span></a>
            </div>

        </div>
    )
}

export default Home;
