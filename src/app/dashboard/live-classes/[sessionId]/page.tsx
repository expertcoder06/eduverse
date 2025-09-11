
"use client";

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, PhoneOff, Video, VideoOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export default function LiveSessionPage() {
  const router = useRouter();
  const params = useParams();
  const { sessionId } = params;
  const { toast } = useToast();

  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [hasPermissions, setHasPermissions] = useState(false);

  const localVideoRef = useRef<HTMLVideoElement>(null);
  const remoteVideoRef = useRef<HTMLVideoElement>(null);
  
  // In a real WebRTC app, you would manage these with a state management library
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
        localStreamRef.current = stream;
        setHasPermissions(true);
        // --- WebRTC Logic would start here ---
        // 1. Initialize RTCPeerConnection
        // 2. Add local stream to the connection
        // 3. Connect to a signaling server (e.g., via WebSocket)
        // 4. Send/receive offers, answers, and ICE candidates
        console.log('WebRTC: Permissions granted and local stream is set.');
        toast({ title: 'Camera and Mic enabled!' });
      } catch (error) {
        console.error('Error accessing media devices.', error);
        toast({
          title: 'Permissions Denied',
          description: 'Camera and mic access are required for live classes.',
          variant: 'destructive',
        });
        setHasPermissions(false);
      }
    };

    getPermissions();
    
    return () => {
        // Cleanup on component unmount
        localStreamRef.current?.getTracks().forEach(track => track.stop());
        peerConnectionRef.current?.close();
    }

  }, []);

  const handleToggleMute = () => {
    if (localStreamRef.current) {
        localStreamRef.current.getAudioTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsMuted(prev => !prev);
    }
  };

  const handleToggleVideo = () => {
     if (localStreamRef.current) {
        localStreamRef.current.getVideoTracks().forEach(track => {
            track.enabled = !track.enabled;
        });
        setIsVideoOff(prev => !prev);
    }
  };

  const handleHangUp = () => {
    toast({ title: 'Leaving class...' });
    router.push('/dashboard/live-classes');
  };

  return (
    <div className="flex h-full flex-col gap-6">
      <CardHeader className="p-0">
        <CardTitle>Live Class Session: {sessionId}</CardTitle>
        <p className="text-muted-foreground">This is a simplified WebRTC demonstration.</p>
      </CardHeader>
      
      <div className="relative grid flex-1 grid-cols-1 md:grid-cols-2 gap-4">
        {/* Remote Video */}
        <Card className="flex flex-col items-center justify-center bg-secondary text-muted-foreground">
           <video ref={remoteVideoRef} autoPlay playsInline className="h-full w-full object-cover hidden" />
           <div className="text-center">
             <p>Remote User</p>
             <p className="text-sm">(Waiting for peer to connect...)</p>
           </div>
        </Card>
        
        {/* Local Video */}
        <div className="relative">
             <video ref={localVideoRef} autoPlay playsInline muted className="aspect-video w-full rounded-lg object-cover" />
             {!hasPermissions && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <p className="text-white">Please allow camera and microphone access.</p>
                </div>
             )}
        </div>

      </div>

      {/* Controls */}
      <Card className="mt-auto">
        <CardContent className="flex items-center justify-center gap-4 p-4">
          <Button
            variant={isMuted ? 'destructive' : 'outline'}
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={handleToggleMute}
            disabled={!hasPermissions}
          >
            {isMuted ? <MicOff /> : <Mic />}
          </Button>
          <Button
             variant={isVideoOff ? 'destructive' : 'outline'}
             size="icon"
             className="h-12 w-12 rounded-full"
             onClick={handleToggleVideo}
             disabled={!hasPermissions}
          >
            {isVideoOff ? <VideoOff /> : <Video />}
          </Button>
           <Button
            variant="destructive"
            size="icon"
            className="h-12 w-12 rounded-full"
            onClick={handleHangUp}
          >
            <PhoneOff />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
