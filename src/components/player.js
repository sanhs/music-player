import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import load from 'audio-loader';

class Player extends Component {
    
    audio = new Audio('http://127.0.0.1:8000/test');
    audioCtx = new AudioContext();
    source = this.audioCtx.createBufferSource();

    componentWillMount() {
        fetch('http://127.0.0.1:8000/test').then(res => {
        // fetch(this.myRequest).then(res => {
            console.log(res);
            return res.arrayBuffer();
        }).then(data => {
            this.audioCtx.decodeAudioData(data)
            .then(track => {
                // this.audio.src = track;
                this.source.buffer = track;
                this.source.connect(this.audioCtx.destination);
                console.log('ready...');
            });
        })
        .catch(err => console.error(err));
    }

    componentDidMount() {
        let path = '/media/l/C09021D69021D426/workspace/music-player/src/components/';
        // load('file:'+path+'test.mp3').then(buffer => {
        //     this.audio.src = buffer;
        // }).catch(err => console.error(err));
        // this.audio.src = 'test.mp3';
    }

    playTrack = () => {
        console.log('playing..');
        this.audio.play();
        // this.source.start(0);
    }
    
    render() {
        
        return (<div className="player-wrapper">
            {/* <audio ref="audio_tag" src={"file:"+path+"test.mp3"} controls={true} autoPlay={true}> </audio>  */}
            <button className="btn btn-primary" onClick={this.playTrack}>Play</button>
        </div>);
    }
}

export default connect()(Player)